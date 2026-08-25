import { connectToDatabase } from './_lib/mongodb.js';
import CreditPackage from './_lib/models/CreditPackage.js';

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
    name: 'Professional',
    credits: 400,
    price: 39.99,
    currency: 'USD',
    description: 'For professionals aiming for maximum impact with multiple resumes and cover letters.',
    popular: false,
    active: true,
    sortOrder: 3
  }
];

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return res.status(200).json({ success: true, packages: DEFAULT_PACKAGES });
    }

    const packages = await CreditPackage.find({ active: true }).sort({ sortOrder: 1 });
    if (!packages || packages.length === 0) {
      return res.status(200).json({ success: true, packages: DEFAULT_PACKAGES });
    }

    return res.status(200).json({
      success: true,
      packages
    });
  } catch (err) {
    return res.status(200).json({ success: true, packages: DEFAULT_PACKAGES });
  }
}
