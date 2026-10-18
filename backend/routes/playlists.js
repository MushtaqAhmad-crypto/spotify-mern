import { Router } from 'express';
import mongoose from 'mongoose';
import Playlist from '../models/Playlist.js';
import Song from '../models/Song.js';
import auth from '../middleware/auth.js';
const router = Router();
router.use(auth);
router.get('/', async (req, res) => res.json(await Playlist.find({ owner: req.user.id }).populate('songs').sort({ createdAt: -1 })));
router.post('/', async (req, res) => {
  const name = req.body.name?.trim();
  if (!name) return res.status(400).json({ message: 'Playlist name is required.' });
  const playlist = await Playlist.create({ name, owner: req.user.id });
  res.status(201).json(await playlist.populate('songs'));
});
router.post('/:id/songs', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id) || !mongoose.isValidObjectId(req.body.songId)) return res.status(400).json({ message: 'Invalid playlist or song ID.' });
    const [playlist, song] = await Promise.all([Playlist.findOne({ _id: req.params.id, owner: req.user.id }), Song.findById(req.body.songId)]);
    if (!playlist) return res.status(404).json({ message: 'Playlist not found.' });
    if (!song) return res.status(404).json({ message: 'Song not found.' });
    if (!playlist.songs.some(id => id.equals(song._id))) playlist.songs.push(song._id);
    await playlist.save(); res.json(await playlist.populate('songs'));
  } catch { res.status(500).json({ message: 'Could not add song.' }); }
});
router.delete('/:id/songs/:songId', async (req, res) => {
  const playlist = await Playlist.findOne({ _id: req.params.id, owner: req.user.id });
  if (!playlist) return res.status(404).json({ message: 'Playlist not found.' });
  playlist.songs = playlist.songs.filter(id => id.toString() !== req.params.songId);
  await playlist.save(); res.json(await playlist.populate('songs'));
});
router.delete('/:id', async (req, res) => {
  const deleted = await Playlist.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
  if (!deleted) return res.status(404).json({ message: 'Playlist not found.' });
  res.json({ message: 'Playlist deleted.' });
});
export default router;
