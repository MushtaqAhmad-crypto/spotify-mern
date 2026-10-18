
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Song from './models/Song.js';

dotenv.config();

async function addSong() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const song = await Song.create({
      title: 'My Favourite Song',
      artist: 'My Artist',
      album: 'My Playlist',
      genre: 'Pop',
      coverUrl: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=500',
      audioUrl: 'http://localhost:5000/songs/my-song.mp3'
    });

    console.log('Song added successfully:', song.title);
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

addSong();
