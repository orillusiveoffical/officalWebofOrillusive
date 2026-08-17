import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from './_lib/mongodb';
import CreditPackage from './_lib/models/CreditPackage';

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectToDatabase();
    let packages = await CreditPackage.find({ active: true }).sort({ sortOrder: 1 });
    if (!packages || packages.length === 0) {
      packages = DEFAULT_PACKAGES as any;
    }
    return res.status(200).json({ success: true, packages });
  } catch (err: any) {
    return res.status(200).json({ success: true, packages: DEFAULT_PACKAGES });
  }
}
