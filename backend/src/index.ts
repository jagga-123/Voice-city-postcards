import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import routes from './routes';
import { errorHandler } from './middlewares/error.middleware';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Behind a reverse proxy (Render, Railway, ...) the real client IP arrives in X-Forwarded-For.
// Without this, express-rate-limit would treat every visitor as the proxy's IP.
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Comma-separated allowlist, e.g. "https://voice-city-postcards.vercel.app,http://localhost:3000".
// Falls back to the local frontend dev origin so nothing breaks out of the box.
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 300, // generous — protects against abuse without affecting normal use
  standardHeaders: true,
  legacyHeaders: false,
});

// Middlewares
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use(helmet());
app.use(morgan('dev'));
app.use(limiter);

// Routes
app.use('/api/v1', routes);

// Unknown routes get a JSON 404 instead of Express's default HTML page
app.use((req, res) => {
  res.status(404).json({ status: 'error', statusCode: 404, message: 'Route not found' });
});

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
