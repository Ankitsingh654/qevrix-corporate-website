import { neon } from '@neondatabase/serverless';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. API Route Handling
    if (url.pathname === '/api/contact/created') {
      if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
      }
      
      if (request.method === 'POST') {
        return await handleContact(request, env);
      }
      
      return new Response("Method not allowed", { status: 405 });
    }

    // 2. Static Asset Serving (SPA Fallback)
    try {
      let response = await env.ASSETS.fetch(request);
      
      // If the asset doesn't exist (e.g. for client-side routes like /services), return index.html
      if (response.status === 404 || response.status === 403) {
        const indexRequest = new Request(new URL('/', request.url), request);
        response = await env.ASSETS.fetch(indexRequest);
      }
      
      return response;
    } catch (e) {
      return new Response("Error fetching asset", { status: 500 });
    }
  }
}

async function handleContact(request, env) {
  try {
    const body = await request.json();
    const { 
      fullName, company, email, phoneNo, phone, interest, estimatedBudget, message, source, 
      submissionType, meetingPurpose, preferredDate, preferredTime, agenda 
    } = body || {};

    const finalPhone = phoneNo || phone;
    const finalSource = submissionType === 'meeting_request' ? 'Meeting Request Form' : (source || 'Website Enquiry Form');
    const finalInterest = submissionType === 'meeting_request' ? meetingPurpose : interest;
    
    let finalMessage = message;
    if (submissionType === 'meeting_request') {
      finalMessage = `[Meeting Date: ${preferredDate}] [Time: ${preferredTime}]\n\nAgenda:\n${agenda || 'No agenda provided'}`;
    }

    // Validation
    const errors = {};
    if (!fullName || !fullName.trim()) errors.fullName = "Full name is required.";
    if (!email || !email.trim()) {
      errors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
    
    if (!finalPhone || !finalPhone.trim()) errors.phoneNo = "Phone number is required.";
    if (!finalInterest || !finalInterest.trim()) errors.interest = "Interest/Purpose is required.";

    if (submissionType !== 'meeting_request' && (!message || !message.trim())) {
      errors.message = "Message details are required.";
    }
    
    if (submissionType === 'meeting_request') {
      if (!preferredDate) errors.preferredDate = "Preferred date is required.";
      if (!preferredTime) errors.preferredTime = "Preferred time is required.";
    }

    if (Object.keys(errors).length > 0) {
      return new Response(JSON.stringify({
        success: false,
        message: "Validation failed",
        errors
      }), { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    const statusVal = 'NEW';
    let insertedId = null;

    // 1. Save to Neon PostgreSQL
    if (!env.DATABASE_URL) {
      console.error("DATABASE_URL is missing in environment variables.");
      return new Response(JSON.stringify({ success: false, message: "Database configuration missing" }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
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
        finalPhone,
        finalInterest,
        estimatedBudget || null,
        finalMessage,
        finalSource,
        statusVal
      ]);
      insertedId = result[0].id;
    } catch (dbError) {
      console.error("Database insert failed:", dbError);
      return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // 2. Safe Email Notification using MailChannels (Cloudflare Native)
    try {
      const mailAdminTo = env.MAIL_ADMIN_TO;
      
      if (mailAdminTo) {
        const companyText = company && company.trim() ? company : "N/A";
        const budgetText = estimatedBudget && estimatedBudget.trim() ? estimatedBudget : "N/A";
        const formattedDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
        
        const emailContent = submissionType === 'meeting_request' ? 
          `QEVRIX Meeting Request\n\nEnquiry ID: ${insertedId}\nFull Name: ${fullName}\nCompany: ${companyText}\nEmail: ${email}\nPhone: ${finalPhone}\nMeeting Purpose: ${finalInterest}\nPreferred Date: ${preferredDate}\nPreferred Time: ${preferredTime}\nAgenda: ${agenda || 'None'}\nSubmitted At: ${formattedDate}` : 
          `QEVRIX Website Enquiry\n\nEnquiry ID: ${insertedId}\nFull Name: ${fullName}\nCompany: ${companyText}\nEmail: ${email}\nPhone: ${finalPhone}\nInterested Service: ${finalInterest}\nEstimated Budget: ${budgetText}\nRequirement: ${finalMessage}\nSource: ${finalSource}\nStatus: ${statusVal}\nSubmitted At: ${formattedDate}`;

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
          subject: `New QEVRIX ${submissionType === 'meeting_request' ? 'Meeting Request' : 'Enquiry'} - ${finalInterest}`,
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
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });

  } catch (err) {
    console.error("Unhandled error in Cloudflare Worker API:", err);
    return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
}
