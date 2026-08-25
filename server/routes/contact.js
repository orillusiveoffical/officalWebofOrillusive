import express from 'express';
import jwt from 'jsonwebtoken';
import { Resend } from 'resend';
import { connectToDatabase } from '../db/mongodb.js';
import Booking from '../models/Booking.js';
import ContactInquiry from '../models/ContactInquiry.js';
import { saveInquiry } from '../db/persistence.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'orillusive_jwt_secret_key_2026';

router.post('/', async (req, res) => {
  try {
    const { name, email, message, service } = req.body || {};

    // Validation
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ success: false, error: 'Full name is required.' });
    }
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'A valid email address is required.' });
    }
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ success: false, error: 'Project brief or message is required.' });
    }

    // Extract user token if present
    let userId = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        userId = decoded.userId;
      } catch (tokenErr) {
        // Token invalid or expired, continue as guest
      }
    }

    const dbConn = await connectToDatabase();
    if (!dbConn) {
      return res.status(500).json({ success: false, error: 'Database connection failed. Unable to record booking.' });
    }

    const savedBooking = await Booking.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      service: service || 'General Software Consultation',
      message: message.trim(),
      userId
    });

    try {
      await ContactInquiry.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        service: service || 'General Software Consultation',
        message: message.trim(),
        status: 'NEW',
        source: 'Website Contact Form',
        bookingId: savedBooking._id
      });
    } catch (inquiryErr) {
      console.warn('ContactInquiry parallel save notice:', inquiryErr.message);
    }

    console.log(`⚡ [ORILLUSIVE MONGO ATLAS] Saved booking call & contact inquiry to MongoDB Atlas from ${email}`);

    // Optional Resend email dispatch
    const apiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'info@orillusive.com';

    if (apiKey && apiKey !== 're_your_resend_api_key_here') {
      try {
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
                <h1 class="title">New Discovery Call Saved</h1>
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
                <div class="label">Project Brief</div>
                <div class="message-box">${message.trim()}</div>
              </div>
              <div class="footer">
                Saved in MongoDB Atlas & dispatched automatically from Orillusive Studio platform.
              </div>
            </div>
          </body>
          </html>
        `;

        await resend.emails.send({
          from: 'Orillusive Intake <onboarding@resend.dev>',
          to: [receiverEmail],
          replyTo: email.trim(),
          subject: `[Discovery Call Booking] ${name.trim()} — ${service || 'Orillusive Studio'}`,
          html: emailHtml,
        });
      } catch (emailErr) {
        console.error('[ORILLUSIVE EMAIL DISPATCH EXCEPTION]', emailErr);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Discovery call request received & saved to database. Our senior team will contact you shortly.',
      booking: savedBooking
    });
  } catch (error) {
    console.error('[ORILLUSIVE BOOKING ERROR]', error);
    return res.status(500).json({ success: false, error: 'Failed to record intake submission.' });
  }
});

export default router;
