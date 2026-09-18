import express from 'express';
import { verifyToken } from '../utils/jwt.js';
import { connectToDatabase } from '../db/mongodb.js';
import Booking from '../models/Booking.js';
import ContactInquiry from '../models/ContactInquiry.js';

const router = express.Router();

router.get('/my', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    const dbConn = await connectToDatabase();
    if (!dbConn) {
      return res.status(200).json({ success: true, bookings: [] });
    }

    const userEmail = (decoded.email || '').toLowerCase().trim();
    const userBookings = await Booking.find({
      $or: [
        { userId: decoded.userId },
        { email: userEmail }
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

router.put('/:id/cancel', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    await connectToDatabase();
    const userEmail = (decoded.email || '').toLowerCase().trim();

    const booking = await Booking.findOne({
      _id: req.params.id,
      $or: [{ userId: decoded.userId }, { email: userEmail }]
    });

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found or not authorized' });
    }

    booking.status = 'cancelled';
    await booking.save();

    if (booking.inquiryId) {
      await ContactInquiry.findByIdAndUpdate(booking.inquiryId, { status: 'CANCELLED' });
    }

    return res.status(200).json({ success: true, booking });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;

