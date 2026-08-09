import express from 'express';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../db/mongodb.js';
import Booking from '../models/Booking.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'orillusive_jwt_secret_key_2026';

router.get('/my', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const dbConn = await connectToDatabase();
    if (!dbConn) {
      return res.status(200).json({ success: true, bookings: [] });
    }

    const userBookings = await Booking.find({
      $or: [
        { userId: decoded.userId },
        { email: decoded.email.toLowerCase() }
      ]
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      bookings: userBookings
    });
  } catch (err) {
    console.error('[ORILLUSIVE BOOKINGS MY ERROR]', err);
    return res.status(401).json({ success: false, error: 'Failed to retrieve user bookings' });
  }
});

export default router;
