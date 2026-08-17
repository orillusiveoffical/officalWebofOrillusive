import express from 'express';
import CreditPackage from '../models/CreditPackage.js';
import { connectToDatabase } from '../db/mongodb.js';

const router = express.Router();

const DEFAULT_PACKAGES = [
  {
    packageId: 'starter',
    name: 'Starter',
    credits: 60,
    price: 9.99,
    currency: 'USD',
    description: 'Ideal for users creating one or two CVs.',
    popular: false,
    active: true,
    sortOrder: 1
  },
  {
    packageId: 'popular',
    name: 'Popular Choice',
    credits: 165,
    price: 19.99,
    currency: 'USD',
    description: 'Best value for active job seekers needing multiple revisions.',
    popular: true,
    active: true,
    sortOrder: 2
  },
  {
    packageId: 'pro',
    name: 'Pro Studio',
    credits: 220,
    price: 29.99,
    currency: 'USD',
    description: 'For power users, consultants & multi-profile applicants.',
    popular: false,
    active: true,
    sortOrder: 3
  }
];

// Seed default packages if collection is empty
export const ensureDefaultPackages = async () => {
  try {
    await connectToDatabase();
    const count = await CreditPackage.countDocuments();
    if (count === 0) {
      await CreditPackage.insertMany(DEFAULT_PACKAGES);
      console.log('✅ Credit packages initialized in MongoDB database');
    }
  } catch (err) {
    console.warn('⚠️ Ensure default credit packages deferred:', err.message);
  }
};

// GET active credit packages
router.get('/', async (req, res) => {
  try {
    await connectToDatabase();
    let packages = await CreditPackage.find({ active: true }).sort({ sortOrder: 1 });
    if (!packages || packages.length === 0) {
      packages = DEFAULT_PACKAGES;
    }
    return res.status(200).json({ success: true, packages });
  } catch (err) {
    return res.status(200).json({ success: true, packages: DEFAULT_PACKAGES });
  }
});

export default router;
