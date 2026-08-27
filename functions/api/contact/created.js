import { neon } from '@neondatabase/serverless';

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const { fullName, company, email, phoneNo, interest, estimatedBudget, message, source } = body || {};

    // Validation
    const errors = {};
    if (!fullName || !fullName.trim()) errors.fullName = "Full name is required.";
    if (!email || !email.trim()) {
      errors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!phoneNo || !phoneNo.trim()) errors.phoneNo = "Phone number is required.";
    if (!interest || !interest.trim()) errors.interest = "Interest is required.";
    if (!message || !message.trim()) errors.message = "Message details are required.";

    if (Object.keys(errors).length > 0) {
      return new Response(JSON.stringify({
        success: false,
        message: "Validation failed",
        errors
      }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    const statusVal = 'NEW';
    let insertedId = null;

    // 1. Save to Neon PostgreSQL
    if (!env.DATABASE_URL) {
      console.error("DATABASE_URL is missing in environment variables.");
      return new Response(JSON.stringify({ success: false, message: "Database configuration missing" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    try {
      const sql = neon(env.DATABASE_URL);
      const queryText = `
        INSERT INTO contact_enquiry (full_name, company, email, phone_no, interest, estimated_budget, message, source, status, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
        RETURNING id
      `;
      const result = await sql(queryText, [
        fullName,
        company || null,
        email,
        phoneNo,
        interest,
        estimatedBudget || null,
        message,
        source || 'Website Enquiry Form',
        statusVal
      ]);
      insertedId = result[0].id;
    } catch (dbError) {
      console.error("Database insert failed:", dbError);
      return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    // 2. Safe Email Notification using MailChannels (Cloudflare Native)
    try {
      const mailAdminTo = env.MAIL_ADMIN_TO;
      
      if (mailAdminTo) {
        const companyText = company && company.trim() ? company : "N/A";
        const budgetText = estimatedBudget && estimatedBudget.trim() ? estimatedBudget : "N/A";
        const formattedDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
        
        const emailContent = `QEVRIX Website Enquiry\n\n` +
                `Enquiry ID: ${insertedId}\n` +
                `Full Name: ${fullName}\n` +
                `Company: ${companyText}\n` +
                `Email: ${email}\n` +
                `Phone: ${phoneNo}\n` +
                `Interested Service: ${interest}\n` +
                `Estimated Budget: ${budgetText}\n` +
                `Requirement: ${message}\n` +
                `Source: ${source || 'Website Enquiry Form'}\n` +
                `Status: ${statusVal}\n` +
                `Submitted At: ${formattedDate}\n`;

        const mailRequest = {
          personalizations: [
            {
              to: [{ email: mailAdminTo }],
            }
          ],
          from: {
            email: "no-reply@qevrix.in", 
            name: "QEVRIX Website",
          },
          subject: `New QEVRIX Enquiry - ${interest}`,
          content: [
            {
              type: "text/plain",
              value: emailContent,
            }
          ]
        };

        const mailResponse = await fetch("https://api.mailchannels.net/tx/v1/send", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(mailRequest),
        });

        if (!mailResponse.ok) {
          console.error(`Failed to send email via MailChannels. Status: ${mailResponse.status} ${mailResponse.statusText}`);
          const text = await mailResponse.text();
          console.error(text);
        } else {
          console.log(`Email notification successfully sent for enquiry ID: ${insertedId}`);
        }
      } else {
        console.warn("MAIL_ADMIN_TO not configured in environment. Skipping email dispatch.");
      }
    } catch (emailError) {
      console.error(`Failed to send contact notification email for enquiry ID: ${insertedId}. Error:`, emailError);
    }

    // 3. Return HTTP 201
    return new Response(JSON.stringify({
      success: true,
      message: "Enquiry submitted successfully",
      data: {
        id: insertedId,
        status: statusVal
      }
    }), { 
      status: 201, 
      headers: { 'Content-Type': 'application/json' } 
    });

  } catch (err) {
    console.error("Unhandled error in Cloudflare Pages Function:", err);
    return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
