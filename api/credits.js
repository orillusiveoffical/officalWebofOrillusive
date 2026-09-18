import jwt from 'jsonwebtoken';
import { connectToDatabase } from './_lib/mongodb.js';
import User from './_lib/models/User.js';
import CreditTransaction from './_lib/models/CreditTransaction.js';

const JWT_SECRET = process.env.JWT_SECRET || 'orillusive_jwt_secret_key_2026';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
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
    const decoded = jwt.verify(token, JWT_SECRET);

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
