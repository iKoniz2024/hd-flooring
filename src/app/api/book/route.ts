import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName = 'N/A',
      phone = 'N/A',
      email = 'N/A',
      service = 'N/A',
      propertyType = 'N/A',
      location = 'N/A',
      preferredDate = 'N/A',
      details = 'N/A',
      source = 'Website Booking Form',
    } = body;

    const recipientEmail = process.env.TO_EMAIL || 'info@hdflooringca.com';
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM || `HD Flooring Website <noreply@hdflooringca.com>`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background-color: #E85D04; color: #ffffff; padding: 24px; text-align: center; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
          .header p { margin: 4px 0 0 0; font-size: 13px; opacity: 0.9; }
          .content { padding: 28px; }
          .badge { display: inline-block; background-color: #fff3eb; color: #E85D04; border: 1px solid #ffd8bf; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { text-align: left; padding: 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
          th { color: #64748b; font-weight: 600; width: 35%; background: #f8fafc; }
          td { color: #0f172a; font-weight: 500; }
          .notes-box { background: #f8fafc; border-left: 4px solid #E85D04; padding: 14px; border-radius: 4px; font-size: 14px; color: #334155; }
          .footer { background: #f1f5f9; padding: 16px; text-align: center; font-size: 12px; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>HD FLOORING</h1>
            <p>New Project Booking & Estimate Request</p>
          </div>
          <div class="content">
            <div class="badge">Source: ${source}</div>
            <table>
              <tr>
                <th>Customer Name</th>
                <td><strong>${fullName}</strong></td>
              </tr>
              <tr>
                <th>Phone Number</th>
                <td><a href="tel:${phone}" style="color: #E85D04; text-decoration: none; font-weight: bold;">${phone}</a></td>
              </tr>
              <tr>
                <th>Email Address</th>
                <td><a href="mailto:${email}" style="color: #0284c7;">${email}</a></td>
              </tr>
              <tr>
                <th>Service Required</th>
                <td><strong>${service}</strong></td>
              </tr>
              <tr>
                <th>Property Type</th>
                <td>${propertyType}</td>
              </tr>
              <tr>
                <th>Location / Address</th>
                <td>${location}</td>
              </tr>
              <tr>
                <th>Preferred Date</th>
                <td>${preferredDate}</td>
              </tr>
            </table>

            <div style="margin-top: 20px;">
              <strong style="font-size: 13px; color: #64748b; display: block; margin-bottom: 6px;">PROJECT DETAILS & NOTES:</strong>
              <div class="notes-box">
                ${details ? String(details).replace(/\n/g, '<br/>') : 'No additional details provided.'}
              </div>
            </div>
          </div>
          <div class="footer">
            Sent automatically from HD Flooring Website (hdflooringca.com)<br/>
            Target Email: ${recipientEmail}
          </div>
        </div>
      </body>
      </html>
    `;

    console.log('=== NEW BOOKING REQUEST RECEIVED ===');
    console.log(`Recipient: ${recipientEmail}`);
    console.log(`Customer: ${fullName} | Phone: ${phone} | Email: ${email}`);
    console.log(`Service: ${service} | Location: ${location}`);
    console.log(`Details: ${details}`);

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      await transporter.sendMail({
        from: smtpFrom,
        to: recipientEmail,
        subject: `New Booking Request from ${fullName} - HD Flooring`,
        html: htmlContent,
        replyTo: email && email !== 'N/A' ? email : undefined,
      });

      console.log(`Email successfully sent to ${recipientEmail}`);
    } else {
      console.warn('SMTP credentials not set in env variables. Payload logged to server console.');
    }

    return NextResponse.json({
      success: true,
      message: 'Booking request submitted successfully!',
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Failed to submit request';
    console.error('Error processing booking request:', error);
    return NextResponse.json(
      { success: false, message: errMessage },
      { status: 500 }
    );
  }
}
