import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from './_lib/mongodb';
import Newsletter from './_lib/models/Newsletter';
import { checkServerlessRateLimit, sanitizeObject } from './_lib/security';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  // Rate Limiting Check
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket?.remoteAddress || '127.0.0.1';
  if (!checkServerlessRateLimit(clientIp, 5, 15 * 60 * 1000)) {
    return res.status(429).json({ success: false, error: 'Too many subscription requests. Please try again later.' });
  }

  try {
    const body = sanitizeObject(req.body || {});
    const { email } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'A valid email address is required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const conn = await connectToDatabase();
    if (conn) {
      const existing = await Newsletter.findOne({ email: normalizedEmail });
      if (existing) {
        return res.status(200).json({
          success: true,
          message: 'You are already subscribed to Orillusive field notes.'
        });
      }

      await Newsletter.create({ email: normalizedEmail });
      console.log(`[ORILLUSIVE VERCEL MONGO ATLAS] Saved subscriber ${normalizedEmail}`);
    }

    return res.status(200).json({
      success: true,
      message: 'Field notes subscription confirmed & saved to database.'
    });
  } catch (err: any) {
    console.error('[ORILLUSIVE VERCEL NEWSLETTER ERROR]', err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'Server error occurred while processing subscription.'
    });
  }
}
