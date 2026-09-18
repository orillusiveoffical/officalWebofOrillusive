import express from 'express';
import crypto from 'crypto';
import { connectToDatabase } from '../db/mongodb.js';
import Design from '../models/Design.js';
import User from '../models/User.js';
import DesignView from '../models/DesignView.js';
import { optionalAuth, requireAuth } from '../middleware/auth.js';
import { escapeRegex } from '../utils/security.js';
import { getJwtSecret } from '../utils/jwt.js';

const router = express.Router();

// Helper to hash IP for privacy-conscious bot/rate-limit tracking
const hashIp = (ip) => {
  if (!ip) return 'unknown';
  return crypto.createHash('sha256').update(ip + getJwtSecret()).digest('hex');
};

// Helper to check user subscription entitlement
const canAccessPremium = (user) => {
  if (!user) return false;
  if (user.role === 'admin' || user.role === 'SUPER_ADMIN') return true;
  return user.subscription?.status === 'active' && ['starter', 'pro', 'enterprise'].includes(user.subscription?.plan);
};

// Helper to sanitize design payload for unauthorized consumers
const sanitizeDesign = (designDoc, user) => {
  const design = designDoc.toObject ? designDoc.toObject() : { ...designDoc };
  const hasAccess = !design.isPremium || canAccessPremium(user);

  if (!hasAccess) {
    design.isLocked = true;
    delete design.reactCode;
    delete design.htmlCode;
    delete design.cssCode;
    delete design.reactPrompt;
    delete design.htmlPrompt;
  } else {
    design.isLocked = false;
  }

  return design;
};

// GET /api/designs — List with search, filters, pagination
router.get('/', optionalAuth, async (req, res) => {
  try {
    await connectToDatabase();

    const {
      search,
      category,
      subcategory,
      style,
      complexity,
      tier,
      featured,
      page = 1,
      limit = 24,
      sort = 'newest'
    } = req.query;

    const query = {};

    if (category && category !== 'all') {
      query.category = new RegExp(`^${category}$`, 'i');
    }

    if (subcategory && subcategory !== 'all') {
      query.subcategory = new RegExp(`^${subcategory}$`, 'i');
    }

    if (style && style !== 'all') {
      query.style = style.toLowerCase();
    }

    if (complexity && complexity !== 'all') {
      query.complexity = complexity.toLowerCase();
    }

    if (tier === 'free') {
      query.isPremium = false;
    } else if (tier === 'premium') {
      query.isPremium = true;
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    if (search && typeof search === 'string' && search.trim()) {
      const regex = new RegExp(escapeRegex(search.trim()), 'i');
      query.$or = [
        { title: regex },
        { description: regex },
        { category: regex },
        { subcategory: regex },
        { tags: regex },
        { style: regex }
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(60, Math.max(1, parseInt(limit, 10) || 24));
    const skip = (pageNum - 1) * limitNum;

    let sortObj = { createdAt: -1 };
    if (sort === 'popular') sortObj = { 'metrics.views': -1, 'metrics.likes': -1 };
    if (sort === 'likes') sortObj = { 'metrics.likes': -1 };
    if (sort === 'oldest') sortObj = { createdAt: 1 };
    if (sort === 'featured') sortObj = { isFeatured: -1, createdAt: -1 };

    const [designs, total] = await Promise.all([
      Design.find(query).sort(sortObj).skip(skip).limit(limitNum),
      Design.countDocuments(query)
    ]);

    const sanitizedDesigns = designs.map((d) => sanitizeDesign(d, req.user));

    res.json({
      success: true,
      data: sanitizedDesigns,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (err) {
    console.error('Error fetching designs:', err);
    res.status(500).json({ success: false, error: 'Failed to retrieve design library.' });
  }
});

// GET /api/designs/categories — Category summary & counts
router.get('/categories', async (req, res) => {
  try {
    await connectToDatabase();

    const categories = await Design.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          subcategories: { $addToSet: '$subcategory' },
          freeCount: { $sum: { $cond: [{ $eq: ['$isPremium', false] }, 1, 0] } },
          premiumCount: { $sum: { $cond: [{ $eq: ['$isPremium', true] }, 1, 0] } }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: categories.map((c) => ({
        category: c._id,
        count: c.count,
        subcategories: c.subcategories.filter(Boolean),
        freeCount: c.freeCount,
        premiumCount: c.premiumCount
      }))
    });
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ success: false, error: 'Failed to retrieve categories.' });
  }
});

// GET /api/designs/:slug — Single design details (read-only, does NOT blindly increment views)
router.get('/:slug', optionalAuth, async (req, res) => {
  try {
    await connectToDatabase();
    const { slug } = req.params;

    const design = await Design.findOne({ slug: slug.toLowerCase() });
    if (!design) {
      return res.status(404).json({ success: false, error: 'Design not found.' });
    }

    const sanitized = sanitizeDesign(design, req.user);

    // Fetch related designs in same category
    const related = await Design.find({
      category: design.category,
      _id: { $ne: design._id }
    })
      .limit(4)
      .select('slug title category subcategory isPremium style metrics colorTokens');

    res.json({
      success: true,
      data: sanitized,
      related: related.map((r) => sanitizeDesign(r, req.user))
    });
  } catch (err) {
    console.error('Error fetching design detail:', err);
    res.status(500).json({ success: false, error: 'Failed to retrieve design.' });
  }
});

// POST /api/designs/:slug/view — Deduplicated, concurrency-safe view event tracking
router.post('/:slug/view', optionalAuth, async (req, res) => {
  try {
    await connectToDatabase();
    const { slug } = req.params;
    const { anonymousVisitorId, sessionId, source = 'web' } = req.body;

    const design = await Design.findOne({ slug: slug.toLowerCase() }).select('_id metrics');
    if (!design) {
      return res.status(404).json({ success: false, error: 'Design not found.' });
    }

    const ipHash = hashIp(req.ip || req.headers['x-forwarded-for']);
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

    // Build deduplication filter
    const dedupConditions = [];
    if (req.user) {
      dedupConditions.push({ userId: req.user._id });
    }
    if (anonymousVisitorId) {
      dedupConditions.push({ anonymousVisitorId });
    }
    if (sessionId) {
      dedupConditions.push({ sessionId });
    }
    dedupConditions.push({ ipHash });

    const recentView = await DesignView.findOne({
      designId: design._id,
      timestamp: { $gte: thirtyMinutesAgo },
      $or: dedupConditions
    });

    if (recentView) {
      return res.json({
        success: true,
        recorded: false,
        message: 'View deduplicated within time window',
        currentViews: design.metrics?.views || 0
      });
    }

    // Record view event in audit collection
    await DesignView.create({
      designId: design._id,
      userId: req.user ? req.user._id : null,
      anonymousVisitorId: anonymousVisitorId || null,
      sessionId: sessionId || null,
      ipHash,
      source,
      timestamp: new Date()
    });

    // Atomically increment view count on the design record
    const updated = await Design.findByIdAndUpdate(
      design._id,
      { $inc: { 'metrics.views': 1 } },
      { new: true }
    ).select('metrics');

    res.json({
      success: true,
      recorded: true,
      currentViews: updated.metrics?.views || 1
    });
  } catch (err) {
    console.error('Error tracking view:', err);
    res.status(500).json({ success: false, error: 'Failed to record view event.' });
  }
});

// GET /api/designs/:slug/code — Protected code endpoint
router.get('/:slug/code', optionalAuth, async (req, res) => {
  try {
    await connectToDatabase();
    const { slug } = req.params;

    const design = await Design.findOne({ slug: slug.toLowerCase() });
    if (!design) {
      return res.status(404).json({ success: false, error: 'Design not found.' });
    }

    if (design.isPremium && !canAccessPremium(req.user)) {
      return res.status(403).json({
        success: false,
        error: 'Subscription required to view full production code for this design.',
        code: 'PREMIUM_LOCKED'
      });
    }

    res.json({
      success: true,
      data: {
        reactCode: design.reactCode,
        htmlCode: design.htmlCode,
        cssCode: design.cssCode
      }
    });
  } catch (err) {
    console.error('Error fetching code:', err);
    res.status(500).json({ success: false, error: 'Failed to retrieve code.' });
  }
});

// GET /api/designs/:slug/prompt — Protected AI prompt endpoint
router.get('/:slug/prompt', optionalAuth, async (req, res) => {
  try {
    await connectToDatabase();
    const { slug } = req.params;

    const design = await Design.findOne({ slug: slug.toLowerCase() });
    if (!design) {
      return res.status(404).json({ success: false, error: 'Design not found.' });
    }

    if (design.isPremium && !canAccessPremium(req.user)) {
      return res.status(403).json({
        success: false,
        error: 'Subscription required to view full AI generation prompt for this design.',
        code: 'PREMIUM_LOCKED'
      });
    }

    res.json({
      success: true,
      data: {
        reactPrompt: design.reactPrompt,
        htmlPrompt: design.htmlPrompt
      }
    });
  } catch (err) {
    console.error('Error fetching prompt:', err);
    res.status(500).json({ success: false, error: 'Failed to retrieve AI prompt.' });
  }
});

// POST /api/designs/:slug/like — Save / bookmark toggle
router.post('/:slug/like', requireAuth, async (req, res) => {
  try {
    await connectToDatabase();
    const { slug } = req.params;

    const design = await Design.findOne({ slug: slug.toLowerCase() });
    if (!design) {
      return res.status(404).json({ success: false, error: 'Design not found.' });
    }

    const user = await User.findById(req.user._id);
    const isSaved = user.savedDesigns?.some((id) => id.toString() === design._id.toString());

    if (isSaved) {
      user.savedDesigns = user.savedDesigns.filter((id) => id.toString() !== design._id.toString());
      await user.save();
      await Design.updateOne({ _id: design._id }, { $inc: { 'metrics.likes': -1 } });
      return res.json({ success: true, isLiked: false, message: 'Removed from saved designs.' });
    } else {
      if (!user.savedDesigns) user.savedDesigns = [];
      user.savedDesigns.push(design._id);
      await user.save();
      await Design.updateOne({ _id: design._id }, { $inc: { 'metrics.likes': 1 } });
      return res.json({ success: true, isLiked: true, message: 'Saved to your collection.' });
    }
  } catch (err) {
    console.error('Error toggling like:', err);
    res.status(500).json({ success: false, error: 'Failed to update bookmark state.' });
  }
});

// POST /api/designs/:slug/copy — Track copy count
router.post('/:slug/copy', async (req, res) => {
  try {
    await connectToDatabase();
    const { slug } = req.params;
    await Design.updateOne({ slug: slug.toLowerCase() }, { $inc: { 'metrics.copies': 1 } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

export default router;
