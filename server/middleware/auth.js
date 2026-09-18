import { verifyToken } from '../utils/jwt.js';
import { connectToDatabase } from '../db/mongodb.js';
import User from '../models/User.js';

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Authentication required. Please sign in.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    await connectToDatabase();

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ success: false, error: 'User account not found.' });
    }

    if (user.status === 'suspended') {
      return res.status(403).json({ success: false, error: 'Your account has been suspended by administration.' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Invalid or expired session. Please log in again.' });
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      req.user = null;
      return next();
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    await connectToDatabase();

    const user = await User.findById(decoded.userId).select('-password');
    if (user && user.status !== 'suspended') {
      req.user = user;
    } else {
      req.user = null;
    }
    next();
  } catch (err) {
    req.user = null;
    next();
  }
};

export const requireSubscription = (requiredTier = 'starter') => {
  const tierHierarchy = { free: 0, starter: 1, pro: 2, enterprise: 3 };

  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        error: 'Authentication required to access premium content.',
        code: 'AUTH_REQUIRED'
      });
    }

    // Admins bypass tier restrictions
    if (req.user.role === 'admin' || req.user.role === 'SUPER_ADMIN') {
      return next();
    }

    const userPlan = req.user.subscription?.plan || 'free';
    const userStatus = req.user.subscription?.status || 'free';

    const hasActiveSubscription = userStatus === 'active';
    const userTierLevel = tierHierarchy[userPlan] || 0;
    const requiredTierLevel = tierHierarchy[requiredTier] || 1;

    if (!hasActiveSubscription || userTierLevel < requiredTierLevel) {
      return res.status(403).json({
        success: false,
        error: `This design requires an active ${requiredTier.toUpperCase()} subscription.`,
        code: 'SUBSCRIPTION_REQUIRED',
        currentPlan: userPlan,
        requiredTier
      });
    }

    next();
  };
};

export const requireRole = (allowedRoles = ['admin']) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Authentication required.' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ success: false, error: 'Access forbidden: Insufficient privileges.' });
    }

    next();
  };
};
