import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import Payment from '../models/Payment.js';
import CreditPackage from '../models/CreditPackage.js';
import CreditTransaction from '../models/CreditTransaction.js';
import User from '../models/User.js';

const router = express.Router();

const DEFAULT_PACKAGES_MAP = {
  starter: { name: 'Starter', credits: 60, price: 9.99, currency: 'USD' },
  popular: { name: 'Popular Choice', credits: 165, price: 19.99, currency: 'USD' },
  pro: { name: 'Pro Studio', credits: 220, price: 29.99, currency: 'USD' }
};

// POST Create Order Checkout Session
router.post('/checkout', requireAuth, async (req, res) => {
  try {
    const { packageId, paymentProvider = 'stripe' } = req.body || {};

    if (!packageId) {
      return res.status(400).json({ success: false, error: 'Credit packageId is required' });
    }

    // Verify package from DB or fallback configuration
    let pkg = await CreditPackage.findOne({ packageId, active: true });
    if (!pkg) {
      const fallback = DEFAULT_PACKAGES_MAP[packageId];
      if (fallback) {
        pkg = { packageId, ...fallback };
      } else {
        return res.status(404).json({ success: false, error: 'Invalid or inactive credit package selected' });
      }
    }

    const transactionId = `TX-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    const newPayment = await Payment.create({
      userId: req.user._id,
      packageId: pkg.packageId,
      credits: pkg.credits,
      amount: pkg.price,
      currency: pkg.currency || 'USD',
      paymentProvider,
      transactionId,
      paymentStatus: 'Pending'
    });

    return res.status(201).json({
      success: true,
      message: 'Checkout session created',
      payment: {
        paymentId: newPayment._id,
        transactionId: newPayment.transactionId,
        packageName: pkg.name,
        credits: pkg.credits,
        amount: pkg.price,
        currency: pkg.currency || 'USD'
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || 'Failed to create checkout session' });
  }
});

// POST Verify Payment & Add Credits (Idempotent Backend Verification)
router.post('/verify', requireAuth, async (req, res) => {
  try {
    const { transactionId } = req.body || {};

    if (!transactionId) {
      return res.status(400).json({ success: false, error: 'Transaction ID is required for payment verification' });
    }

    const payment = await Payment.findOne({ transactionId, userId: req.user._id });
    if (!payment) {
      return res.status(404).json({ success: false, error: 'Payment transaction record not found' });
    }

    // Prevent duplicate credit additions (Idempotency)
    if (payment.paymentStatus === 'Completed') {
      const current = await User.findById(req.user._id).select('credits');
      return res.status(200).json({
        success: true,
        alreadyProcessed: true,
        message: 'Payment already completed and credits applied.',
        creditsAdded: payment.credits,
        newBalance: current ? current.credits : 0
      });
    }

    // Process payment completion & atomic credit addition
    payment.paymentStatus = 'Completed';
    await payment.save();

    const user = await User.findById(req.user._id);
    const balanceBefore = user.credits || 0;
    const balanceAfter = balanceBefore + payment.credits;

    user.credits = balanceAfter;
    await user.save();

    // Create Audit Transaction Ledger Entry
    await CreditTransaction.create({
      userId: req.user._id,
      type: 'Credit Purchase',
      amount: payment.credits,
      balanceBefore,
      balanceAfter,
      paymentId: payment._id,
      description: `Purchased Package ${payment.packageId.toUpperCase()} (+${payment.credits} Credits)`
    });

    return res.status(200).json({
      success: true,
      message: `Payment Successful! You received ${payment.credits} credits.`,
      creditsAdded: payment.credits,
      newBalance: balanceAfter,
      transactionId: payment.transactionId
    });
  } catch (err) {
    console.error('[PAYMENT VERIFY ERROR]', err);
    return res.status(500).json({ success: false, error: err.message || 'Payment verification failed' });
  }
});

export default router;
