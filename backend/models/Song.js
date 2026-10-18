import mongoose from 'mongoose';
const songSchema = new mongoose.Schema({
  title: { type: String, required: true }, artist: { type: String, required: true },
  album: { type: String, default: 'Single' }, coverUrl: { type: String, default: '' },
  audioUrl: { type: String, required: true }, genre: { type: String, default: 'Pop' },
  duration: { type: Number, default: 0 }
}, { timestamps: true });
export default mongoose.model('Song', songSchema);
