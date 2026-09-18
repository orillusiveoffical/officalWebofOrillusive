import { verifyToken } from './_lib/jwt.js';
import { connectToDatabase } from './_lib/mongodb.js';
import User from './_lib/models/User.js';
import CreditTransaction from './_lib/models/CreditTransaction.js';

const ALLOWED_ORIGINS = new Set([
  'https://orillusive.com',
  'https://www.orillusive.com',
  'http://localhost:3000',
  'http://localhost:5000',
  'http://127.0.0.1:3000'
]);

export default async function handler(req, res) {
  const origin = req.headers.origin;
  if (origin && (ALLOWED_ORIGINS.has(origin) || /^https:\/\/weborillusive(-[a-z0-9-]+)?\.vercel\.app$/.test(origin))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    const conn = await connectToDatabase();
    if (!conn) {
      return res.status(500).json({ success: false, error: 'Database connection failed' });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const transactions = await CreditTransaction.find({ userId: decoded.userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      credits: user.credits ?? 25,
      transactions: transactions || []
    });
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Invalid authentication token' });
  }
}
