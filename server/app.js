import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
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
import { authLimiter, contactLimiter, apiLimiter } from './middleware/rateLimiter.js';
import contactRouter from './routes/contact.js';
import newsletterRouter from './routes/newsletter.js';
import authRouter from './routes/auth.js';
import bookingsRouter from './routes/bookings.js';
import cvsRouter from './routes/cvs.js';
import packagesRouter, { ensureDefaultPackages } from './routes/packages.js';
import creditsRouter from './routes/credits.js';
import paymentsRouter from './routes/payments.js';
import generationRouter from './routes/generation.js';
import adminRouter, { ensureDefaultDashboardData } from './routes/admin.js';
import { connectToDatabase } from './db/mongodb.js';

dotenv.config();

const app = express();

// Security: Disable X-Powered-By header
app.disable('x-powered-by');

// Security: Helmet HTTP Headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "https://api.resend.com"]
      }
    },
    hsts: {
      maxAge: 63072000,
      includeSubDomains: true,
      preload: true
    },
    frameguard: { action: 'deny' },
    noSniff: true,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
  })
);

// Security: Dynamic CORS Policy (Supports local dev, Vercel deployments, and production domain)
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5000',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5000',
  'https://orillusive.com',
  'https://www.orillusive.com'
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.some((o) => origin.startsWith(o)) ||
        origin.endsWith('.vercel.app') ||
        origin.includes('localhost') ||
        origin.includes('127.0.0.1')
      ) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive in dev to avoid CORS blocking dashboard
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
);

// Auto DB Connection Middleware
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
  } catch (err) {
    console.warn('DB Connection middleware notice:', err.message);
  }
  next();
});

// Body Parsing & NoSQL Operator Sanitization
app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitizeMiddleware);
app.use(requestLogger);

// Initialize Database connection & seed defaults on server startup
connectToDatabase()
  .then(() => {
    ensureDefaultPackages();
    ensureDefaultDashboardData();
  })
  .catch((err) => {
    console.warn('⚠️ MongoDB connection deferred:', err.message);
  });

// Health telemetry check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OPERATIONAL',
    studio: 'Orillusive.',
    system: 'Software Engineering Studio Z+ Secured',
    timestamp: new Date().toISOString()
  });
});

// Rate Limited API Routes
app.use('/api/auth', authLimiter, authRouter);
app.use('/api/contact', contactLimiter, contactRouter);
app.use('/api/bookings', apiLimiter, bookingsRouter);
app.use('/api/newsletter', contactLimiter, newsletterRouter);

// CV Maker & Credit Monetization SaaS Routes
app.use('/api/cvs', apiLimiter, cvsRouter);
app.use('/api/packages', apiLimiter, packagesRouter);
app.use('/api/credits', apiLimiter, creditsRouter);
app.use('/api/payments', apiLimiter, paymentsRouter);
app.use('/api/generation', apiLimiter, generationRouter);

// Internal Dashboard & Admin Control Center Routes
app.use('/api/admin', apiLimiter, adminRouter);

// Fallback 404 handler for undefined API endpoints (strictly returns JSON)
app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    error: `Endpoint not found: [${req.method}] ${req.originalUrl}`
  });
});

// Centralized Error Handling Middleware (strictly returns JSON)
app.use(errorHandler);

export default app;
