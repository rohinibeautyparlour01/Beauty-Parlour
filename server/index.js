
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./utils/db');

const app = express();

app.set('trust proxy', 1);
app.use(helmet());

const origins = (process.env.CLIENT_URL || '*')
  .split(',')
  .map((s) => s.trim());

app.use(
  cors({
    origin: origins.includes('*') ? true : origins,
  })
);

app.use(express.json({ limit: '50kb' }));

// Health check routes
app.get('/', (_req, res) => {
  res.json({
    ok: true,
    service: 'Rohini Beauty Parlour API',
  });
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

// Rate limiters
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const bookingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'Too many requests. Please try again later.',
  },
});

// Website chatbot (not WhatsApp automation)
app.use('/api/chat', limiter, require('./routes/chat'));

// Connect to MongoDB before handling booking requests
app.use('/api/bookings', async (_req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('[Database] Connection error:', err.message);

    res.status(503).json({
      success: false,
      message: 'Service temporarily unavailable.',
    });
  }
});

// Booking API
app.post('/api/bookings', bookingLimiter);
app.use('/api/bookings', limiter, require('./routes/bookings'));

// Handle unknown routes
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Not found',
  });
});

// Start server
const PORT = process.env.PORT || 5000;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
  });
}

module.exports = app;
