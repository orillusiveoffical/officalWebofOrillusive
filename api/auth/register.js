import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../_lib/mongodb.js';
import User from '../_lib/models/User.js';
import { validatePasswordStrength, checkServerlessRateLimit, sanitizeObject } from '../_lib/security.js';

const JWT_SECRET = process.env.JWT_SECRET || 'orillusive_jwt_secret_key_2026';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1';
  if (!checkServerlessRateLimit(clientIp, 5, 15 * 60 * 1000)) {
    return res.status(429).json({ success: false, error: 'Too many registration requests. Please try again after 15 minutes.' });
  }

  try {
    const body = sanitizeObject(req.body || {});
    const { name, email, password } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Full name is required' });
    }
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'Valid email address is required' });
    }

    const passValidation = validatePasswordStrength(password || '');
    if (!passValidation.valid) {
      return res.status(400).json({ success: false, error: passValidation.error });
    }

    const conn = await connectToDatabase();
    if (!conn) {
      return res.status(500).json({ success: false, error: 'Database connection failed' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'An account with this email address already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      credits: 25
    });

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    return res.status(201).json({
      success: true,
      message: 'Account registered successfully.',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        credits: newUser.credits ?? 25
      }
    });
  } catch (err) {
    console.error('[ORILLUSIVE VERCEL REGISTER ERROR]', err);
    return res.status(500).json({ success: false, error: err?.message || 'Server error during registration' });
  }
}
