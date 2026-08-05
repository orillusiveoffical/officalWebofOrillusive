import express from 'express';
import { saveSubscriber } from '../db/persistence.js';

const router = express.Router();

router.post('/', (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required.' });
    }

    const sub = saveSubscriber(email);
    return res.status(200).json({
      success: true,
      message: 'Field notes subscription confirmed.'
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to record newsletter subscription.' });
  }
});

export default router;
