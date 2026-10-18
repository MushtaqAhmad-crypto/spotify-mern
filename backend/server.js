import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import songRoutes from './routes/songs.js';
import playlistRoutes from './routes/playlists.js';
dotenv.config();
const app = express();
app.use('/songs', express.static('public/songs'));
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());
app.get('/api/health', (_req, res) => res.json({ ok: true, message: 'SoundWave API is running' }));
app.use('/api/auth', authRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/playlists', playlistRoutes);
const port = process.env.PORT || 5000;
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error('Missing MONGO_URI or JWT_SECRET. Create backend/.env from .env.example');
  process.exit(1);
}
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(port, () => console.log(`API running at http://localhost:${port}`)))
  .catch(err => { console.error('MongoDB connection failed:', err.message); process.exit(1); });
