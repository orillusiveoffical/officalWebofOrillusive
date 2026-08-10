import express from 'express';
import { connectToDatabase } from '../db/mongodb.js';
import Newsletter from '../models/Newsletter.js';
import { saveSubscriber } from '../db/persistence.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email } = req.body || {};

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'A valid email address is required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const dbConn = await connectToDatabase();
    if (dbConn) {
      const existing = await Newsletter.findOne({ email: normalizedEmail });
      if (existing) {
        return res.status(200).json({
          success: true,
          message: 'You are already subscribed to Orillusive field notes.'
        });
      }

      await Newsletter.create({ email: normalizedEmail });
      console.log(`⚡ [ORILLUSIVE MONGO ATLAS] Saved newsletter subscriber to MongoDB Atlas: ${normalizedEmail}`);
    } else {
      // Fallback local persistence
      saveSubscriber(normalizedEmail);
      console.log(`ℹ️ [ORILLUSIVE NEWSLETTER] Saved subscriber to local fallback: ${normalizedEmail}`);
    }

    return res.status(200).json({
      success: true,
      message: 'Field notes subscription confirmed & saved to database.'
    });
  } catch (error) {
    console.error('[ORILLUSIVE NEWSLETTER ERROR]', error);
    return res.status(500).json({ success: false, error: 'Failed to record newsletter subscription.' });
  }
});

export default router;

