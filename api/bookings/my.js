import { verifyToken } from '../_lib/jwt.js';
import { connectToDatabase } from '../_lib/mongodb.js';
import Booking from '../_lib/models/Booking.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    const conn = await connectToDatabase();
    if (!conn) {
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
    return res.status(401).json({ success: false, error: 'Failed to fetch bookings' });
  }
}
