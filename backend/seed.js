import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Song from './models/Song.js';
dotenv.config();
const songs = [
 { title: 'Sunny Morning', artist: 'SoundWave Studio', album: 'Fresh Start', genre: 'Chill', coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
 { title: 'Midnight Drive', artist: 'SoundWave Studio', album: 'After Hours', genre: 'Electronic', coverUrl: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=500', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
 { title: 'Golden Hour', artist: 'SoundWave Studio', album: 'Soft Focus', genre: 'Pop', coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
 { title: 'Ocean Lights', artist: 'SoundWave Studio', album: 'Blue Skies', genre: 'Chill', coverUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
 { title: 'City Rhythm', artist: 'SoundWave Studio', album: 'Night City', genre: 'Electronic', coverUrl: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=500', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
 { title: 'Quiet Roads', artist: 'SoundWave Studio', album: 'Slow Days', genre: 'Acoustic', coverUrl: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=500', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' }
];
try { await mongoose.connect(process.env.MONGO_URI); await Song.deleteMany({}); await Song.insertMany(songs); console.log(`Seeded ${songs.length} demo tracks.`); }
catch (e) { console.error(e.message); process.exitCode = 1; }
finally { await mongoose.disconnect(); }
