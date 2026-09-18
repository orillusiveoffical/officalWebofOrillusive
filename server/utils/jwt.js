import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// Runtime in-memory fallback secret generated randomly per process instance
// NEVER uses a hardcoded string, preventing offline token forgery across environments
const fallbackSecret = crypto.randomBytes(32).toString('hex');

export const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      console.error('🚨 [CRITICAL SECURITY ERROR] JWT_SECRET is not configured in production environment variables.');
    } else {
      console.warn('⚠️ [SECURITY NOTICE] JWT_SECRET is not set. Using ephemeral random secret for this session.');
    }
    return fallbackSecret;
  }
  return secret;
};

export const signToken = (payload, options = { expiresIn: '7d' }) => {
  return jwt.sign(payload, getJwtSecret(), options);
};

export const verifyToken = (token) => {
  return jwt.verify(token, getJwtSecret());
};

export default {
  getJwtSecret,
  signToken,
  verifyToken
};
