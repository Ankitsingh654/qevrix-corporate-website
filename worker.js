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
      const errorDetails = {
        name: dbError?.name,
        message: dbError?.message,
        stack: dbError?.stack,
        cause: dbError?.cause
          ? {
              name: dbError.cause?.name,
              message: dbError.cause?.message,
              stack: dbError.cause?.stack
            }
          : null
      };

      console.error(
        "DATABASE_ERROR_DETAILS:",
        JSON.stringify(errorDetails)
      );

      return new Response(
        JSON.stringify({
          success: false,
          debug: "QEVRIX_DB_DEBUG_V2",
          error: errorDetails
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json"
          }
        }
      );
    }

    // 2. Safe Email Notification using Resend
    try {
      let mailAdminTo = env.MAIL_ADMIN_TO;
      if (finalInterest === 'BRANDING_DESIGN' || finalInterest === 'Branding & Design') {
        const brandingEmail = env.MAIL_BRANDING_TO;
        mailAdminTo = brandingEmail ? brandingEmail : env.MAIL_ADMIN_TO;
      }
      
      const resendApiKey = env.RESEND_API_KEY;
      
      if (!resendApiKey) {
        console.error("RESEND_API_KEY is missing in environment variables. Email will not be sent.");
      }

      if (mailAdminTo && resendApiKey) {
        const companyText = company && company.trim() ? company : "N/A";
        const budgetText = estimatedBudget && estimatedBudget.trim() ? estimatedBudget : "N/A";
        const formattedDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
        
        const emailContent = submissionType === 'meeting_request' ? 
          `QEVRIX Meeting Request\n\nEnquiry ID: ${insertedId}\nFull Name: ${fullName}\nCompany: ${companyText}\nEmail: ${email}\nPhone: ${finalPhone}\nMeeting Purpose: ${finalInterest}\nPreferred Date: ${preferredDate}\nPreferred Time: ${preferredTime}\nAgenda: ${agenda || 'None'}\nSubmitted At: ${formattedDate}` : 
          `QEVRIX Website Enquiry\n\nEnquiry ID: ${insertedId}\nFull Name: ${fullName}\nCompany: ${companyText}\nEmail: ${email}\nPhone: ${finalPhone}\nInterested Service: ${finalInterest}\nEstimated Budget: ${budgetText}\nRequirement: ${finalMessage}\nSource: ${finalSource}\nStatus: ${statusVal}\nSubmitted At: ${formattedDate}`;

        let dynamicRowsHtml = '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size: 14px; text-align: left;">';
        
        if (submissionType === 'meeting_request') {
          dynamicRowsHtml += `
            <tr>
              <td width="35%" valign="top" style="padding-bottom: 12px; color: #64748B; font-size: 12px; font-weight: 500;">Meeting Purpose</td>
              <td width="65%" valign="top" style="padding-bottom: 12px; color: #0F172A; font-weight: 500; word-break: break-word;">${finalInterest}</td>
            </tr>
            <tr>
              <td width="35%" valign="top" style="padding-bottom: 12px; color: #64748B; font-size: 12px; font-weight: 500;">Preferred Date</td>
              <td width="65%" valign="top" style="padding-bottom: 12px; color: #0F172A; font-weight: 500; word-break: break-word;">${preferredDate}</td>
            </tr>
            <tr>
              <td width="35%" valign="top" style="padding-bottom: 12px; color: #64748B; font-size: 12px; font-weight: 500;">Preferred Time</td>
              <td width="65%" valign="top" style="padding-bottom: 12px; color: #0F172A; font-weight: 500; word-break: break-word;">${preferredTime}</td>
            </tr>
            <tr>
              <td width="35%" valign="top" style="color: #64748B; font-size: 12px; font-weight: 500;">Agenda</td>
              <td width="65%" valign="top" style="color: #0F172A; font-weight: 500; word-break: break-word; white-space: pre-wrap;">${agenda || 'None'}</td>
            </tr>
          `;
        } else {
          const messageLines = finalMessage.split('\n').filter(line => line.trim() !== '');
          messageLines.forEach((line, index) => {
             const colonIndex = line.indexOf(':');
             const isLast = index === messageLines.length - 1 && (!estimatedBudget || estimatedBudget.trim() === '' || estimatedBudget === 'Not Specified');
             const pbStyle = isLast ? 'padding-bottom: 0;' : 'padding-bottom: 12px;';
             
             if (colonIndex !== -1) {
                const label = line.substring(0, colonIndex).trim();
                const val = line.substring(colonIndex + 1).trim();
                dynamicRowsHtml += `
                  <tr>
                    <td width="35%" valign="top" style="${pbStyle} color: #64748B; font-size: 12px; font-weight: 500;">${label}</td>
                    <td width="65%" valign="top" style="${pbStyle} color: #0F172A; font-weight: 500; word-break: break-word;">${val}</td>
                  </tr>
                `;
             } else {
                dynamicRowsHtml += `
                  <tr>
                    <td width="35%" valign="top" style="${pbStyle} color: #64748B; font-size: 12px; font-weight: 500;">Details</td>
                    <td width="65%" valign="top" style="${pbStyle} color: #0F172A; font-weight: 500; word-break: break-word; white-space: pre-wrap;">${line}</td>
                  </tr>
                `;
             }
          });

          if (estimatedBudget && estimatedBudget.trim() && estimatedBudget !== 'Not Specified') {
              dynamicRowsHtml += `
                <tr>
                  <td width="35%" valign="top" style="color: #64748B; font-size: 12px; font-weight: 500;">Estimated Budget</td>
                  <td width="65%" valign="top" style="color: #0F172A; font-weight: 500; word-break: break-word;">${budgetText}</td>
                </tr>
              `;
          }
        }
        
        dynamicRowsHtml += '</table>';

        const adminEmailHtml = `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  @media only screen and (max-width: 600px) {
    .mob-block { display: block !important; width: 100% !important; box-sizing: border-box !important; }
    .mob-pt { padding-top: 16px !important; }
    .mob-badge { margin-top: 12px !important; text-align: left !important; }
  }
</style>
</head>
<body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: Arial, Helvetica, sans-serif; -webkit-font-smoothing: antialiased;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F8FAFC; padding: 20px 10px;">
  <tr>
    <td align="center">
      <table width="100%" style="max-width: 680px; background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.05);" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="background-color: #0B0B0B; border-bottom: 3px solid #FF5A00; padding: 24px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td class="mob-block" align="left" valign="middle">
                  <img src="https://qevrix.in/assets/qevrix-logo.png" alt="QEVRIX" width="140" style="display: block; border: 0; margin-bottom: 4px;" />
                  <p style="margin: 0; color: #A0AEC0; font-size: 10px; letter-spacing: 2px; text-transform: uppercase;">Building Intelligent Futures</p>
                </td>
                <td class="mob-block mob-badge" align="right" valign="middle">
                  <span style="color: #FF5A00; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">New Enquiry</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 24px;">
            <p style="margin: 0 0 24px 0; font-size: 15px; color: #475569;">A new enquiry has been received from your QEVRIX website.</p>
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid #E2E8F0; border-radius: 6px; margin-bottom: 24px;">
              <tr>
                <td style="padding: 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td class="mob-block" width="50%" valign="top">
                        <p style="margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; color: #64748B; font-weight: 600; letter-spacing: 0.5px;">Enquiry ID</p>
                        <p style="margin: 0 0 16px 0; font-size: 14px; color: #0F172A; font-weight: 500;">#${insertedId}</p>
                        <p style="margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; color: #64748B; font-weight: 600; letter-spacing: 0.5px;">Status</p>
                        <p style="margin: 0 0 16px 0; font-size: 12px; font-weight: 600; color: #FF5A00; background-color: #FFF7ED; padding: 4px 10px; border-radius: 4px; display: inline-block;">${statusVal}</p>
                        <p style="margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; color: #64748B; font-weight: 600; letter-spacing: 0.5px;">Interested Service</p>
                        <p style="margin: 0; font-size: 14px; color: #FF5A00; font-weight: 600;">${finalInterest}</p>
                      </td>
                      <td class="mob-block mob-pt" width="50%" valign="top">
                        <p style="margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; color: #64748B; font-weight: 600; letter-spacing: 0.5px;">Submitted At</p>
                        <p style="margin: 0 0 16px 0; font-size: 14px; color: #0F172A; font-weight: 500;">${formattedDate}</p>
                        <p style="margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; color: #64748B; font-weight: 600; letter-spacing: 0.5px;">Source</p>
                        <p style="margin: 0; font-size: 14px; color: #0F172A; font-weight: 500;">${finalSource}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <h3 style="margin: 0 0 16px 0; font-size: 13px; font-weight: 700; color: #1E293B; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #FF5A00; padding-bottom: 8px;">Contact Details</h3>
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid #E2E8F0; border-radius: 6px; margin-bottom: 24px;">
              <tr>
                <td style="padding: 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td class="mob-block" width="50%" valign="top">
                        <p style="margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; color: #64748B; font-weight: 600; letter-spacing: 0.5px;">Full Name</p>
                        <p style="margin: 0 0 16px 0; font-size: 14px; color: #0F172A; font-weight: 500; word-break: break-word;">${fullName}</p>
                      </td>
                      <td class="mob-block" width="50%" valign="top">
                        <p style="margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; color: #64748B; font-weight: 600; letter-spacing: 0.5px;">Company</p>
                        <p style="margin: 0 0 16px 0; font-size: 14px; color: #0F172A; font-weight: 500; word-break: break-word;">${companyText}</p>
                      </td>
                    </tr>
                    <tr>
                      <td class="mob-block" width="50%" valign="top">
                        <p style="margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; color: #64748B; font-weight: 600; letter-spacing: 0.5px;">Email</p>
                        <p style="margin: 0 0 16px 0; font-size: 14px; font-weight: 500; word-break: break-word; overflow-wrap: anywhere;"><a href="mailto:${email}" style="color: #FF5A00; text-decoration: none;">${email}</a></p>
                      </td>
                      <td class="mob-block" width="50%" valign="top">
                        <p style="margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; color: #64748B; font-weight: 600; letter-spacing: 0.5px;">Phone</p>
                        <p style="margin: 0; font-size: 14px; font-weight: 500; word-break: break-word;"><a href="tel:${finalPhone}" style="color: #FF5A00; text-decoration: none;">${finalPhone}</a></p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <h3 style="margin: 0 0 16px 0; font-size: 13px; font-weight: 700; color: #1E293B; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #FF5A00; padding-bottom: 8px;">Requirement Overview</h3>
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid #E2E8F0; border-radius: 6px; margin-bottom: 24px;">
              <tr>
                <td style="padding: 20px;">
                  ${dynamicRowsHtml}
                </td>
              </tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #FFF7ED; border-left: 4px solid #FF5A00; border-radius: 4px;">
              <tr>
                <td style="padding: 16px;">
                  <h4 style="margin: 0 0 8px 0; color: #C2410C; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Next Steps</h4>
                  <p style="margin: 0; color: #9A3412; font-size: 14px; line-height: 1.5;">Our team will review this enquiry and get back to the client soon.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color: #0B0B0B; padding: 32px 24px; text-align: center;">
            <img src="https://qevrix.in/assets/qevrix-logo.png" alt="QEVRIX" width="120" style="display: inline-block; border: 0; margin-bottom: 8px;" />
            <p style="margin: 0 0 20px 0; color: #A0AEC0; font-size: 11px; letter-spacing: 2px; text-transform: uppercase;">BUILDING INTELLIGENT FUTURES</p>
            <p style="margin: 0 0 16px 0; color: #A0AEC0; font-size: 13px;"><a href="mailto:contact@qevrix.in" style="color: #FF5A00; text-decoration: none;">contact@qevrix.in</a> &nbsp;|&nbsp; <a href="https://qevrix.in" style="color: #FF5A00; text-decoration: none;">www.qevrix.in</a></p>
            <p style="margin: 0; padding-top: 16px; border-top: 1px solid #1E293B; color: #475569; font-size: 11px;">This is an automated email. Please do not reply.</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

        const mailRequest = {
          from: "QEVRIX Website <no-reply@qevrix.in>",
          to: [mailAdminTo],
          subject: `New QEVRIX ${submissionType === 'meeting_request' ? 'Meeting Request' : 'Enquiry'} - ${finalInterest}`,
          html: adminEmailHtml,
          text: emailContent
        };

        const mailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${resendApiKey}`
          },
          body: JSON.stringify(mailRequest)
        });

        const responseText = await mailResponse.text();

        console.log("ADMIN EMAIL STATUS:", mailResponse.status);
        console.log("ADMIN EMAIL RESPONSE:", responseText);

        if (!mailResponse.ok) {
          console.error(`Failed to send admin email. Status: ${mailResponse.status}`);
          console.error(responseText);
        } else {
          console.log("ADMIN EMAIL SENT SUCCESSFULLY");
        }

        // 2b. User Confirmation Email
        if (email && email.trim()) {
          try {
            const userSubject = submissionType === 'meeting_request'
              ? "We received your meeting request — QEVRIX"
              : "We received your enquiry — QEVRIX";

            const userBody = submissionType === 'meeting_request'
              ? `Hi ${fullName},\n\nThank you for contacting QEVRIX.\n\nWe have successfully received your meeting request.\n\nOur team will review the requested meeting details and get back to you shortly.\n\nRegards,\nQEVRIX Team\ncontact@qevrix.in\nhttps://qevrix.in`
              : `Hi ${fullName},\n\nThank you for contacting QEVRIX.\n\nWe have successfully received your enquiry regarding ${finalInterest}.\n\nOur team will review your requirements and get back to you shortly.\n\nRegards,\nQEVRIX Team\ncontact@qevrix.in\nhttps://qevrix.in`;

            const userEmailHtml = `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: Arial, Helvetica, sans-serif; -webkit-font-smoothing: antialiased;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F8FAFC; padding: 20px 10px;">
  <tr>
    <td align="center">
      <table width="100%" style="max-width: 600px; background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.05);" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="background-color: #0B0B0B; border-bottom: 3px solid #FF5A00; padding: 24px 24px; text-align: center;">
            <img src="https://qevrix.in/assets/qevrix-logo.png" alt="QEVRIX" width="160" style="display: inline-block; border: 0; margin-bottom: 4px;" />
            <p style="margin: 0; color: #A0AEC0; font-size: 10px; letter-spacing: 2px; text-transform: uppercase;">Building Intelligent Futures</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 32px 24px; color: #334155; font-size: 15px; line-height: 1.6;">
            <p style="margin-top: 0;">Hi <strong>${fullName}</strong>,</p>
            <p>Thank you for contacting QEVRIX.</p>
            <p>${submissionType === 'meeting_request' ? 'We have successfully received your meeting request.' : `We have successfully received your enquiry regarding <strong>${finalInterest}</strong>.`}</p>
            <p>${submissionType === 'meeting_request' ? 'Our team will review the requested meeting details and get back to you shortly.' : 'Our team will review your requirements and get back to you shortly.'}</p>
            <br/>
            <p style="margin-bottom: 0;">Regards,</p>
            <p style="margin: 4px 0 0 0; font-weight: 700; color: #0F172A;">QEVRIX Team</p>
          </td>
        </tr>
        <tr>
          <td style="background-color: #0B0B0B; padding: 32px 24px; text-align: center;">
            <img src="https://qevrix.in/assets/qevrix-logo.png" alt="QEVRIX" width="120" style="display: inline-block; border: 0; margin-bottom: 8px;" />
            <p style="margin: 0 0 20px 0; color: #A0AEC0; font-size: 11px; letter-spacing: 2px; text-transform: uppercase;">BUILDING INTELLIGENT FUTURES</p>
            <p style="margin: 0 0 16px 0; color: #A0AEC0; font-size: 13px;"><a href="mailto:contact@qevrix.in" style="color: #FF5A00; text-decoration: none;">contact@qevrix.in</a> &nbsp;|&nbsp; <a href="https://qevrix.in" style="color: #FF5A00; text-decoration: none;">www.qevrix.in</a></p>
            <p style="margin: 0; padding-top: 16px; border-top: 1px solid #1E293B; color: #475569; font-size: 11px;">This is an automated email. Please do not reply.</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

            const userMailRequest = {
              from: "QEVRIX Website <no-reply@qevrix.in>",
              to: [email.trim()],
              subject: userSubject,
              html: userEmailHtml,
              text: userBody
            };

            const userMailResponse = await fetch("https://api.resend.com/emails", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${resendApiKey}`
              },
              body: JSON.stringify(userMailRequest)
            });

            const userResponseText = await userMailResponse.text();
            console.log("USER CONFIRMATION EMAIL STATUS:", userMailResponse.status);
            console.log("USER CONFIRMATION EMAIL RESPONSE:", userResponseText);

            if (!userMailResponse.ok) {
              console.error(`Failed to send user confirmation email. Status: ${userMailResponse.status}`);
              console.error(userResponseText);
            } else {
              console.log("USER CONFIRMATION EMAIL SENT SUCCESSFULLY");
            }
          } catch (userMailError) {
            console.error("Failed to send user confirmation email. Error:", userMailError);
          }
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
