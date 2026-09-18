import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import CV from '../models/CV.js';
import User from '../models/User.js';
import CreditTransaction from '../models/CreditTransaction.js';
import CVGeneration from '../models/CVGeneration.js';

const router = express.Router();

const CV_GENERATION_COST = 5; // Configurable cost per CV generation

// GET CV Generation Cost Configuration
router.get('/cost', async (req, res) => {
  return res.status(200).json({
    success: true,
    cost: CV_GENERATION_COST,
    currency: 'Credits'
  });
});

// POST Generate Professional CV & Deduct Credits Server-Side
router.post('/generate', requireAuth, async (req, res) => {
  try {
    const { cvId } = req.body || {};

    if (!cvId) {
      return res.status(400).json({ success: false, error: 'CV ID is required for generation' });
    }

    const cv = await CV.findOne({ _id: cvId, userId: req.user._id });
    if (!cv) {
      return res.status(404).json({ success: false, error: 'CV not found or access denied.' });
    }

    // Atomic server-side credit deduction with condition check
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id, credits: { $gte: CV_GENERATION_COST } },
      { $inc: { credits: -CV_GENERATION_COST } },
      { new: true }
    );

    if (!updatedUser) {
      const freshUser = await User.findById(req.user._id).select('credits');
      const currentCredits = freshUser ? freshUser.credits : 0;
      const needed = Math.max(0, CV_GENERATION_COST - currentCredits);
      return res.status(402).json({
        success: false,
        error: 'Insufficient Credits',
        message: `You need ${needed} more credit${needed === 1 ? '' : 's'} to generate this CV.`,
        requiredCredits: CV_GENERATION_COST,
        availableCredits: currentCredits,
        neededCredits: needed
      });
    }

    const balanceAfter = updatedUser.credits;
    const balanceBefore = balanceAfter + CV_GENERATION_COST;

    // Mark CV status as generated
    cv.status = 'generated';
    await cv.save();

    // Log Credit Transaction
    await CreditTransaction.create({
      userId: user._id,
      type: 'CV Generation',
      amount: -CV_GENERATION_COST,
      balanceBefore,
      balanceAfter,
      cvId: cv._id,
      description: `Generated Professional CV (${cv.title})`
    });

    // Log Generation Record
    const genRecord = await CVGeneration.create({
      userId: user._id,
      cvId: cv._id,
      templateId: cv.templateId,
      creditsUsed: CV_GENERATION_COST,
      version: 1
    });

    return res.status(200).json({
      success: true,
      message: 'Professional CV generated successfully!',
      creditsUsed: CV_GENERATION_COST,
      remainingCredits: balanceAfter,
      generationId: genRecord._id,
      cv
    });
  } catch (err) {
    console.error('[CV GENERATION ERROR]', err);
    return res.status(500).json({ success: false, error: err.message || 'Failed to generate CV' });
  }
});

export default router;
