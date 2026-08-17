import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import CreditTransaction from '../models/CreditTransaction.js';
import User from '../models/User.js';

const router = express.Router();

// GET user credit balance
router.get('/balance', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('credits');
    return res.status(200).json({
      success: true,
      credits: user ? user.credits : 0
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || 'Failed to fetch credit balance' });
  }
});

// GET credit transaction history ledger
router.get('/transactions', requireAuth, async (req, res) => {
  try {
    const transactions = await CreditTransaction.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(100);

    return res.status(200).json({
      success: true,
      transactions
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || 'Failed to fetch credit transactions' });
  }
});

export default router;
