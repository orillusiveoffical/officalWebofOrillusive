import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { connectToDatabase } from '../_lib/mongodb';
import User from '../_lib/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'orillusive_jwt_secret_key_2026';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    const conn = await connectToDatabase();
    if (!conn) {
      return res.status(500).json({ success: false, error: 'Database connection unconfigured' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ success: false, error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password || '');
    if (!isMatch) {
      return res.status(400).json({ success: false, error: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err: any) {
    console.error('[ORILLUSIVE VERCEL LOGIN ERROR]', err);
    return res.status(500).json({ success: false, error: err?.message || 'Server error during login' });
  }
}
