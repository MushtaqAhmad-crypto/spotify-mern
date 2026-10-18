# SoundWave — MERN Music Player

A Spotify-inspired learning project built with React + Vite + Bootstrap, Express, MongoDB, JWT and HTML Audio.

## Requirements
- Node.js 18+
- MongoDB Community Server running locally

## 1. Backend
```bash
cd backend
npm install
```
Create `backend/.env` based on `.env.example`, then run:
```bash
npm run seed
npm run dev
```
Backend: http://localhost:5000

## 2. Frontend (new terminal)
```bash
cd frontend
npm install
npm run dev
```
Open the Vite URL shown in terminal (usually http://localhost:5173).

## Demo songs
Put your own MP3 files in `frontend/public/songs/` and update `backend/seed.js` paths if desired. Seed data uses public sample audio URLs, which require internet. Use only music you have permission to stream.

## Notes
- Register a user, then log in.
- Create playlists and add songs.
- This is an educational starter, not a production streaming service. Add rate limiting, validation, secure deployment configuration, and licensed audio before public launch.
