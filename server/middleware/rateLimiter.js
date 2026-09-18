import rateLimit from 'express-rate-limit';

// Strict Rate Limiting for Auth Endpoints (10 requests per 15 minutes)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many authentication attempts from this IP address. Please try again after 15 minutes.'
  }
});

// Rate Limiting for Search & Filters (120 requests per 10 minutes)
export const searchLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Search rate limit exceeded. Please slow down.'
  }
});

// Rate Limiting for Protected Code & Prompt Extractions (60 requests per 15 minutes)
export const codePromptLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Code extraction request limit reached. Please try again shortly.'
  }
});

// Strict Rate Limiting for Payment / Checkout Actions (5 requests per 10 minutes)
export const sensitiveLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Payment request limit exceeded. Please wait a few minutes before trying again.'
  }
});

// Rate Limiting for Contact / Booking Form Submissions (5 requests per 15 minutes)
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

// General Browsing API Rate Limiter (300 requests per 15 minutes)
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Rate limit exceeded. Please try again after a few minutes.'
  }
});
