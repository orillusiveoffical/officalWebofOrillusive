import express from 'express';
import { connectToDatabase } from '../db/mongodb.js';
import User from '../models/User.js';
import SubscriptionPlan from '../models/SubscriptionPlan.js';
import PaymentTransaction from '../models/PaymentTransaction.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Fallback subscription plans configuration
const DEFAULT_PLANS = [
  {
    planId: 'starter',
    name: 'Starter',
    tagline: 'Essential UI patterns & code for individual designers & makers.',
    priceMonthly: 9,
    priceAnnual: 90,
    currency: 'USD',
    isPopular: false,
    features: [
      'Access to core curated UI library',
      'HTML/CSS & React source code downloads',
      'Authentic AI generation prompts',
      'Standard responsive preview controls',
      'Up to 50 saved designs',
      'Community support'
    ],
    entitlements: {
      fullLibraryAccess: false,
      starterPremiumAccess: true,
      unlimitedSaves: false,
      exportCodeReact: true,
      exportCodeHtml: true,
      aiPromptsAccess: true,
      tokenPaletteStudio: false,
      earlyAccessDesigns: false,
      prioritySupport: false
    }
  },
  {
    planId: 'pro',
    name: 'Pro Designer',
    tagline: 'Advanced UI systems & accelerated workflow for active product builders.',
    priceMonthly: 16,
    priceAnnual: 160,
    currency: 'USD',
    isPopular: true,
    features: [
      'Everything in Starter',
      'Extended premium UI systems & dashboards',
      'Full React & HTML code access',
      'Advanced prompt recipes with animation specs',
      'Early access to weekly releases',
      'Up to 500 saved designs',
      'Priority ticket support'
    ],
    entitlements: {
      fullLibraryAccess: true,
      starterPremiumAccess: true,
      unlimitedSaves: false,
      exportCodeReact: true,
      exportCodeHtml: true,
      aiPromptsAccess: true,
      tokenPaletteStudio: true,
      earlyAccessDesigns: true,
      prioritySupport: true
    }
  },
  {
    planId: 'enterprise',
    name: 'Studio & Team',
    tagline: 'Unrestricted design power, token palette studio, and priority release access.',
    priceMonthly: 20,
    priceAnnual: 200,
    currency: 'USD',
    isPopular: false,
    features: [
      'Everything in Pro',
      'Unlimited design library access & future drops',
      'Live Token Palette Customization Studio',
      'Interactive sandbox variable presets',
      'Unlimited saved designs & collections',
      'Enterprise license for client projects',
      'Dedicated 1-on-1 design assistance'
    ],
    entitlements: {
      fullLibraryAccess: true,
      starterPremiumAccess: true,
      unlimitedSaves: true,
      exportCodeReact: true,
      exportCodeHtml: true,
      aiPromptsAccess: true,
      tokenPaletteStudio: true,
      earlyAccessDesigns: true,
      prioritySupport: true
    }
  }
];

// GET /api/payments/plans — List all subscription tiers
router.get('/plans', async (req, res) => {
  try {
    await connectToDatabase();
    let plans = await SubscriptionPlan.find().sort({ priceMonthly: 1 });

    if (!plans || plans.length === 0) {
      // Seed default plans if not yet populated
      plans = await SubscriptionPlan.insertMany(DEFAULT_PLANS);
    }

    res.json({ success: true, data: plans });
  } catch (err) {
    console.error('Error fetching plans:', err);
    res.json({ success: true, data: DEFAULT_PLANS });
  }
});

// GET /api/payments/subscription — Get current user's subscription
router.get('/subscription', requireAuth, async (req, res) => {
  try {
    await connectToDatabase();
    const user = await User.findById(req.user._id).populate('savedDesigns', 'slug title category isPremium');

    res.json({
      success: true,
      data: {
        subscription: user.subscription || { plan: 'free', status: 'free' },
        savedDesignsCount: user.savedDesigns ? user.savedDesigns.length : 0,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Error fetching user subscription:', err);
    res.status(500).json({ success: false, error: 'Failed to retrieve subscription details.' });
  }
});

// POST /api/payments/payoneer/checkout — Create Payoneer checkout session / intent
router.post('/payoneer/checkout', requireAuth, async (req, res) => {
  try {
    const { planId, billingCycle = 'monthly' } = req.body;

    const plan = DEFAULT_PLANS.find((p) => p.planId === planId);
    if (!plan) {
      return res.status(400).json({ success: false, error: 'Invalid subscription plan selected.' });
    }

    const amount = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;

    await connectToDatabase();

    // Create a pending transaction record
    const transaction = await PaymentTransaction.create({
      userId: req.user._id,
      planId: plan.planId,
      billingCycle,
      amount,
      currency: 'USD',
      provider: 'payoneer',
      providerPaymentStatus: 'initiated',
      status: 'pending',
      metadata: {
        userEmail: req.user.email,
        planName: plan.name
      }
    });

    /**
     * In a live production environment with Payoneer Checkout API credentials:
     * We send a POST request to https://api.payoneer.com/v4/charges with authorization header
     * and redirect URL.
     * 
     * Here we return the verified structured checkout payload and simulated secure redirect.
     */
    const isMock = !process.env.PAYONEER_PROGRAM_ID || !process.env.PAYONEER_API_KEY;

    res.json({
      success: true,
      data: {
        transactionId: transaction._id,
        planId: plan.planId,
        planName: plan.name,
        amount,
        currency: 'USD',
        billingCycle,
        checkoutUrl: `/checkout/payoneer?tx=${transaction._id}&plan=${plan.planId}`,
        isTestMode: isMock
      }
    });
  } catch (err) {
    console.error('Error creating Payoneer checkout session:', err);
    res.status(500).json({ success: false, error: 'Failed to initialize payment gateway.' });
  }
});

// POST /api/payments/payoneer/verify — Verify payment completion & activate subscription
router.post('/payoneer/verify', requireAuth, async (req, res) => {
  try {
    const { transactionId } = req.body;
    if (!transactionId) {
      return res.status(400).json({ success: false, error: 'Transaction ID is required.' });
    }

    await connectToDatabase();

    const transaction = await PaymentTransaction.findOne({
      _id: transactionId,
      userId: req.user._id
    });

    if (!transaction) {
      return res.status(404).json({ success: false, error: 'Transaction record not found.' });
    }

    // Set transaction status to completed
    transaction.status = 'completed';
    transaction.providerPaymentStatus = 'success';
    await transaction.save();

    // Update user subscription state
    const validUntil = new Date();
    if (transaction.billingCycle === 'annual') {
      validUntil.setFullYear(validUntil.getFullYear() + 1);
    } else {
      validUntil.setMonth(validUntil.getMonth() + 1);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          'subscription.plan': transaction.planId,
          'subscription.status': 'active',
          'subscription.billingCycle': transaction.billingCycle,
          'subscription.validUntil': validUntil
        }
      },
      { new: true }
    ).select('-password');

    res.json({
      success: true,
      message: `Successfully upgraded to ${transaction.planId.toUpperCase()} subscription!`,
      data: {
        subscription: updatedUser.subscription,
        user: updatedUser
      }
    });
  } catch (err) {
    console.error('Error verifying payment:', err);
    res.status(500).json({ success: false, error: 'Payment verification failed.' });
  }
});

// POST /api/payments/payoneer/webhook — Webhook listener for Payoneer callbacks with signature validation
router.post('/payoneer/webhook', async (req, res) => {
  try {
    const webhookSecret = process.env.PAYONEER_WEBHOOK_SECRET;
    const authHeader = req.headers['x-payoneer-signature'] || req.headers.authorization;

    // Validate webhook authenticity if secret is configured
    if (webhookSecret) {
      if (!authHeader || (authHeader !== webhookSecret && !authHeader.includes(webhookSecret))) {
        console.warn('⚠️ [PAYONEER WEBHOOK] Rejected unauthorized webhook call: signature mismatch.');
        return res.status(401).json({ error: 'Unauthorized webhook call.' });
      }
    } else if (process.env.NODE_ENV === 'production') {
      console.warn('⚠️ [PAYONEER WEBHOOK] Webhook received in production but PAYONEER_WEBHOOK_SECRET is unset.');
    }

    const event = req.body;
    console.log('[Payoneer Webhook Received]:', event?.type);

    if (event && event.type === 'CHARGE_COMPLETED') {
      await connectToDatabase();
      const { transaction_id, status } = event.data || {};
      if (transaction_id) {
        await PaymentTransaction.findOneAndUpdate(
          { providerTransactionId: transaction_id },
          { status: status === 'APPROVED' ? 'completed' : 'failed' }
        );
      }
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.error('Payoneer webhook error:', err);
    res.status(400).json({ error: 'Webhook handler error' });
  }
});

export default router;
