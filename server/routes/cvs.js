import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import CV from '../models/CV.js';

const router = express.Router();

// GET all CVs for current user
router.get('/', requireAuth, async (req, res) => {
  try {
    const cvs = await CV.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    return res.status(200).json({ success: true, cvs });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || 'Failed to fetch CVs' });
  }
});

// GET single CV by ID
router.get('/:id', requireAuth, async (req, res) => {
  try {
    const cv = await CV.findOne({ _id: req.params.id, userId: req.user._id });
    if (!cv) {
      return res.status(404).json({ success: false, error: 'CV not found or access denied.' });
    }
    return res.status(200).json({ success: true, cv });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || 'Failed to fetch CV' });
  }
});

// POST create new CV
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, templateId, personalInfo, summary, experience, education, skills, projects, certifications, languages, achievements, customSections, customization } = req.body || {};

    const newCv = await CV.create({
      userId: req.user._id,
      title: title || 'Untitled Resume',
      templateId: templateId || 'minimal',
      personalInfo: personalInfo || { name: req.user.name, email: req.user.email },
      summary: summary || '',
      experience: experience || [],
      education: education || [],
      skills: skills || [],
      projects: projects || [],
      certifications: certifications || [],
      languages: languages || [],
      achievements: achievements || [],
      customSections: customSections || [],
      customization: customization || {},
      status: 'draft'
    });

    return res.status(201).json({ success: true, message: 'CV created successfully', cv: newCv });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || 'Failed to create CV' });
  }
});

// PUT update existing CV
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const cv = await CV.findOne({ _id: req.params.id, userId: req.user._id });
    if (!cv) {
      return res.status(404).json({ success: false, error: 'CV not found or access denied.' });
    }

    const updates = req.body || {};
    Object.keys(updates).forEach((key) => {
      if (key !== '_id' && key !== 'userId') {
        cv[key] = updates[key];
      }
    });

    await cv.save();
    return res.status(200).json({ success: true, message: 'CV saved successfully', cv });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || 'Failed to update CV' });
  }
});

// DELETE CV
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const deleted = await CV.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'CV not found or access denied.' });
    }
    return res.status(200).json({ success: true, message: 'CV deleted successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || 'Failed to delete CV' });
  }
});

// POST duplicate CV
router.post('/:id/duplicate', requireAuth, async (req, res) => {
  try {
    const original = await CV.findOne({ _id: req.params.id, userId: req.user._id });
    if (!original) {
      return res.status(404).json({ success: false, error: 'CV not found or access denied.' });
    }

    const copyData = original.toObject();
    delete copyData._id;
    delete copyData.createdAt;
    delete copyData.updatedAt;
    copyData.title = `${copyData.title} (Copy)`;
    copyData.status = 'draft';

    const duplicatedCv = await CV.create(copyData);
    return res.status(201).json({ success: true, message: 'CV duplicated successfully', cv: duplicatedCv });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || 'Failed to duplicate CV' });
  }
});

export default router;
