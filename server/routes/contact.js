import express from 'express';
import { saveInquiry } from '../db/persistence.js';

const router = express.Router();

router.post('/', (req, res) => {
  try {
    const { name, email, message, service } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required.' });
    }

    const inquiry = saveInquiry({ name: name || 'Anonymous', email, message: message || '', service: service || 'General' });
    console.log(`[ORILLUSIVE INTAKE] Saved new contact from ${email}`);
    
    return res.status(201).json({
      success: true,
      message: 'Strategy call request received. Senior team will reach out within 24 hours.',
      inquiryId: inquiry.id
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to record intake submission.' });
  }
});

export default router;
