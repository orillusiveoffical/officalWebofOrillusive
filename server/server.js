import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { requestLogger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import contactRouter from './routes/contact.js';
import newsletterRouter from './routes/newsletter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Health telemetry check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OPERATIONAL',
    studio: 'Orillusive.',
    system: 'Software Engineering Studio',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/contact', contactRouter);
app.use('/api/newsletter', newsletterRouter);

// Centralized Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`⚡ [ORILLUSIVE ENGINE] API Telemetry Server running at http://localhost:${PORT}`);
});
