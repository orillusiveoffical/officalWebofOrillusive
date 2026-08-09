import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as jwt from 'jsonwebtoken';
import { connectToDatabase } from '../_lib/mongodb';
import User from '../_lib/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'orillusive_jwt_secret_key_2026';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };

    const conn = await connectToDatabase();
    if (!conn) {
      return res.status(500).json({ success: false, error: 'Database connection unconfigured' });
    }

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err: any) {
    return res.status(401).json({ success: false, error: 'Invalid or expired authentication token' });
  }
}
