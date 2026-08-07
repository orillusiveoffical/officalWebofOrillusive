import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const { name, email, service, message } = req.body || {};

    // Basic server-side validation for required fields
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ success: false, error: 'Full name is required.' });
    }
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'A valid email address is required.' });
    }
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ success: false, error: 'Project brief or message is required.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'hello@orillusive.com';

    if (!apiKey || apiKey === 're_your_resend_api_key_here') {
      console.warn('[ORILLUSIVE RESEND] RESEND_API_KEY is missing or unconfigured. Processing intake in mock mode.');
      return res.status(200).json({
        success: true,
        message: 'Inquiry received successfully (Mock Mode: Please configure RESEND_API_KEY in environment variables).'
      });
    }

    const resend = new Resend(apiKey);

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f7f7f5; color: #111111; margin: 0; padding: 24px; }
          .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid rgba(0,0,0,0.1); padding: 32px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { border-bottom: 1px solid #eeeeee; padding-bottom: 16px; margin-bottom: 24px; }
          .title { font-size: 20px; font-weight: bold; color: #111111; margin: 0; text-transform: uppercase; letter-spacing: 0.1em; }
          .subtitle { font-size: 11px; color: #4F6B85; font-weight: bold; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 4px; }
          .field { margin-bottom: 20px; }
          .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #777777; font-weight: bold; margin-bottom: 4px; }
          .value { font-size: 15px; color: #111111; font-weight: 500; }
          .message-box { background: #f7f7f5; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #333333; border: 1px solid #e5e5e0; white-space: pre-wrap; }
          .footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid #eeeeee; font-size: 11px; color: #888888; text-align: center; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <div class="subtitle">Orillusive Studio Intake</div>
            <h1 class="title">New Discovery Inquiry</h1>
          </div>
          <div class="field">
            <div class="label">Full Name</div>
            <div class="value">${name.trim()}</div>
          </div>
          <div class="field">
            <div class="label">Email Address</div>
            <div class="value"><a href="mailto:${email.trim()}">${email.trim()}</a></div>
          </div>
          <div class="field">
            <div class="label">Service Focus</div>
            <div class="value">${service || 'General Software Consultation'}</div>
          </div>
          <div class="field">
            <div class="label">Project Brief & Requirements</div>
            <div class="message-box">${message.trim()}</div>
          </div>
          <div class="footer">
            Sent automatically from Orillusive Engineering Studio platform.
          </div>
        </div>
      </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Orillusive Intake <onboarding@resend.dev>',
      to: [receiverEmail],
      replyTo: email.trim(),
      subject: `[Discovery Call Inquiry] ${name.trim()} — ${service || 'Orillusive Studio'}`,
      html: emailHtml,
    });

    if (error) {
      console.error('[ORILLUSIVE RESEND ERROR]', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Failed to dispatch email via Resend.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Inquiry successfully transmitted via Resend.',
      data
    });
  } catch (err: any) {
    console.error('[ORILLUSIVE INTAKE EXCEPTION]', err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'Server error occurred while processing submission.'
    });
  }
}
