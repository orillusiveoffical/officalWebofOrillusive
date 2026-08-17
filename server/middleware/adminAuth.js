import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../db/mongodb.js';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'orillusive_jwt_secret_key_2026';

const INTERNAL_ROLES = ['SUPER_ADMIN', 'DEVELOPER', 'ANALYTICS', 'admin'];

export const isInternalRole = (role) => {
  return INTERNAL_ROLES.includes(role);
};

export const requireInternalRole = (allowedRoles = ['SUPER_ADMIN', 'DEVELOPER', 'ANALYTICS']) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, error: 'Authentication required. Access denied.' });
      }

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      await connectToDatabase();

      const user = await User.findById(decoded.userId).select('-password');
      if (!user) {
        return res.status(401).json({ success: false, error: 'User account not found.' });
      }

      if (user.status === 'suspended') {
        return res.status(403).json({ success: false, error: 'Your account has been suspended by administration.' });
      }

      const role = user.role || 'client';

      // Super Admin and legacy 'admin' have unrestricted access across all admin modules
      if (role === 'SUPER_ADMIN' || role === 'admin') {
        req.user = user;
        return next();
      }

      // Check specific role authorization
      if (allowedRoles.includes(role)) {
        req.user = user;
        return next();
      }

      return res.status(403).json({
        success: false,
        error: 'Forbidden: You do not have permission to access this internal dashboard resource.'
      });
    } catch (err) {
      return res.status(401).json({ success: false, error: 'Invalid or expired session. Please log in again.' });
    }
  };
};
