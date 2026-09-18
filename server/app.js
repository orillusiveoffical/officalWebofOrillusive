import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local and .env from process.cwd() and parent directory
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { requestLogger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { mongoSanitizeMiddleware } from './middleware/sanitize.js';
import {
  authLimiter,
  contactLimiter,
  apiLimiter,
  searchLimiter,
  codePromptLimiter,
  sensitiveLimiter
} from './middleware/rateLimiter.js';

// Route Imports
import authRouter from './routes/auth.js';
import designRouter from './routes/designRoutes.js';
import paymentRouter from './routes/paymentRoutes.js';
import contactRouter from './routes/contact.js';
import newsletterRouter from './routes/newsletter.js';
import adminRouter from './routes/admin.js';
import blogsRouter from './routes/blogs.js';
import bookingsRouter from './routes/bookings.js';
import generationRouter from './routes/generation.js';
import creditsRouter from './routes/credits.js';
import cvsRouter from './routes/cvs.js';
import { connectToDatabase } from './db/mongodb.js';

const app = express();

// Security: Disable X-Powered-By header
app.disable('x-powered-by');

// Security: Helmet HTTP Headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", 'https://api.resend.com', 'https://api.payoneer.com']
      }
    },
    hsts: {
      maxAge: 63072000,
      includeSubDomains: true,
      preload: true
    },
    frameguard: { action: 'deny' },
    noSniff: true,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  })
);

// Security: Whitelist-based Strict CORS Policy
const allowedOrigins = new Set([
  'http://localhost:3000',
  'http://localhost:5000',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5000',
  'https://orillusive.com',
  'https://www.orillusive.com'
]);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!origin) {
        return callback(null, true);
      }
      // Exact match against whitelist
      if (allowedOrigins.has(origin)) {
        return callback(null, true);
      }
      // Specific Orillusive Vercel deployments only
      if (/^https:\/\/weborillusive(-[a-z0-9-]+)?\.vercel\.app$/.test(origin)) {
        return callback(null, true);
      }
      // Local development ports
      if (process.env.NODE_ENV !== 'production' && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS policy blocked access from origin: ${origin}`));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400
  })
);

// Auto DB Connection Middleware
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
  } catch (err) {
    // MongoDB notice in dev
  }
  next();
});

// Body Parsing & NoSQL Operator Sanitization
app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitizeMiddleware);
app.use(requestLogger);

// Health & Brand Status Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OPERATIONAL',
    brand: 'Orillusive',
    tagline: 'Build Beyond the Obvious',
    platform: 'UI Design & Implementation Discovery Platform',
    timestamp: new Date().toISOString()
  });
});

// Primary UI Platform Routes with Layered Rate Limiting
app.use(['/api/designs', '/designs'], apiLimiter, designRouter);
app.use(['/api/payments', '/payments'], sensitiveLimiter, paymentRouter);
app.use(['/api/auth', '/auth'], authLimiter, authRouter);

// Complementary Studio Routes
app.use(['/api/contact', '/contact'], contactLimiter, contactRouter);
app.use(['/api/bookings', '/bookings'], contactLimiter, bookingsRouter);
app.use(['/api/generation', '/generation'], sensitiveLimiter, generationRouter);
app.use(['/api/credits', '/credits'], apiLimiter, creditsRouter);
app.use(['/api/cvs', '/cvs'], apiLimiter, cvsRouter);
app.use(['/api/newsletter', '/newsletter'], contactLimiter, newsletterRouter);
app.use(['/api/blogs', '/blogs'], apiLimiter, blogsRouter);
app.use(['/api/admin', '/admin'], apiLimiter, adminRouter);

// Static Client Files & Technical SEO Assets (when built)
const clientDistPath = path.resolve(__dirname, '../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));

  // Legacy Redirects & Clean URLs
  app.get('/privacy-policy', (req, res) => res.redirect(301, '/privacy'));
  app.get('/terms-and-conditions', (req, res) => res.redirect(301, '/terms'));

  // Public SPA routes fallback
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// Fallback 404 handler for undefined API endpoints (strictly returns JSON)
app.use(['/api', '/api/*'], (req, res) => {
  res.status(404).json({
    success: false,
    error: `Endpoint not found: [${req.method}] ${req.originalUrl}`
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

export default app;
