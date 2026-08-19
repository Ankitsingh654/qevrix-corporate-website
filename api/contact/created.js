const { Pool } = require('@neondatabase/serverless');
const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { fullName, company, email, phoneNo, interest, estimatedBudget, message, source } = req.body || {};

  // Validation
  const errors = {};
  if (!fullName || !fullName.trim()) {
    errors.fullName = "Full name is required.";
  }
  if (!email || !email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!phoneNo || !phoneNo.trim()) {
    errors.phoneNo = "Phone number is required.";
  }
  if (!interest || !interest.trim()) {
    errors.interest = "Interest is required.";
  }
  if (!message || !message.trim()) {
    errors.message = "Message details are required.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors
    });
  }

  let insertedId = null;
  const statusVal = 'NEW';

  // 1. Save to Neon PostgreSQL
  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const queryText = `
      INSERT INTO contact_enquiry (full_name, company, email, phone_no, interest, estimated_budget, message, source, status, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
      RETURNING id
    `;
    const values = [
      fullName,
      company || null,
      email,
      phoneNo,
      interest,
      estimatedBudget || null,
      message,
      source || 'Website Enquiry Form',
      statusVal
    ];
    const result = await pool.query(queryText, values);
    insertedId = result.rows[0].id;
    await pool.end();
  } catch (dbError) {
    console.error("Database insert failed:", dbError);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }

  // 2. Safe Email Notification
  try {
    const mailHost = process.env.MAIL_HOST || 'smtp.gmail.com';
    const mailPort = parseInt(process.env.MAIL_PORT || '587', 10);
    const mailUser = process.env.MAIL_USERNAME;
    const mailPass = process.env.MAIL_PASSWORD;
    const mailFrom = process.env.MAIL_FROM || mailUser;
    const mailAdminTo = process.env.MAIL_ADMIN_TO;

    if (mailUser && mailPass && mailAdminTo) {
      const transporter = nodemailer.createTransport({
        host: mailHost,
        port: mailPort,
        secure: mailPort === 465,
        auth: {
          user: mailUser,
          pass: mailPass
        }
      });

      const companyText = company && company.trim() ? company : "N/A";
      const budgetText = estimatedBudget && estimatedBudget.trim() ? estimatedBudget : "N/A";
      const formattedDate = new Date().toISOString().replace('T', ' ').substring(0, 19);

      const mailOptions = {
        from: mailFrom,
        to: mailAdminTo,
        subject: `New QEVRIX Enquiry - ${interest}`,
        text: `QEVRIX Website Enquiry\n\n` +
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
              `Submitted At: ${formattedDate}\n`
      };

      await transporter.sendMail(mailOptions);
      console.log(`Email notification successfully sent for enquiry ID: ${insertedId}`);
    } else {
      console.warn("Mail credentials or admin recipient address not fully configured in environment. Skipping email dispatch.");
    }
  } catch (emailError) {
    console.error(`Failed to send contact notification email for enquiry ID: ${insertedId}. Error:`, emailError);
  }

  // 3. Return HTTP 201
  return res.status(201).json({
    success: true,
    message: "Enquiry submitted successfully",
    data: {
      id: insertedId,
      status: statusVal
    }
  });
};
