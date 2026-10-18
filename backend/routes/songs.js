import { Router } from 'express';
import Song from '../models/Song.js';
const router = Router();
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.q) filter.$or = [ { title: { $regex: req.query.q, $options: 'i' } }, { artist: { $regex: req.query.q, $options: 'i' } }, { album: { $regex: req.query.q, $options: 'i' } } ];
    if (req.query.genre) filter.genre = req.query.genre;
    res.json(await Song.find(filter).sort({ createdAt: -1 }));
  } catch { res.status(500).json({ message: 'Could not load songs.' }); }
});
router.get('/:id', async (req, res) => {
  try { const song = await Song.findById(req.params.id); if (!song) return res.status(404).json({ message: 'Song not found.' }); res.json(song); }
  catch { res.status(400).json({ message: 'Invalid song ID.' }); }
});
export default router;
