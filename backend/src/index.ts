import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDB } from './db';
import zonesRoutes from './routes/zones.routes';
import reportsRoutes from './routes/reports.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Routes
app.use('/api/zones', zonesRoutes);
app.use('/api/reports', reportsRoutes);
// Alias for backward compatibility if needed, though clean routes are better
app.post('/api/report', (req, res, next) => {
  // Redirect old /api/report to /api/zones/report
  req.url = '/report';
  zonesRoutes(req, res, next);
});
app.post('/api/restore', (req, res, next) => {
  // Redirect old /api/restore to /api/zones/restore
  req.url = '/restore';
  zonesRoutes(req, res, next);
});

// Initialize DB and start server
const startServer = async () => {
  try {
    await initDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
