import rateLimit from 'express-rate-limit';

// Strict Rate Limiting for Auth Endpoints (5 requests per 15 minutes)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many authentication attempts from this IP address. Please try again after 15 minutes.'
  }
});

// Strict Rate Limiting for Contact / Booking Form Submissions (5 requests per 15 minutes)
export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many discovery call requests submitted from this IP address. Please try again later.'
  }
});

// General API Rate Limiter (100 requests per 15 minutes)
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Rate limit exceeded. Please try again after a few minutes.'
  }
});
