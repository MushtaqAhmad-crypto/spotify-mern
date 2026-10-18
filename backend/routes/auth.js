import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import auth from '../middleware/auth.js';
const router = Router();
const makeToken = user => jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name?.trim() || !email?.trim() || !password || password.length < 6) return res.status(400).json({ message: 'Name, email and password (minimum 6 characters) are required.' });
    if (await User.findOne({ email: email.toLowerCase() })) return res.status(409).json({ message: 'Email is already registered.' });
    const user = await User.create({ name: name.trim(), email, password: await bcrypt.hash(password, 12) });
    res.status(201).json({ token: makeToken(user), user: { id: user._id, name: user.name, email: user.email } });
  } catch (e) { res.status(500).json({ message: 'Could not register user.' }); }
});
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email?.toLowerCase() });
    if (!user || !(await bcrypt.compare(req.body.password || '', user.password))) return res.status(401).json({ message: 'Invalid email or password.' });
    res.json({ token: makeToken(user), user: { id: user._id, name: user.name, email: user.email } });
  } catch { res.status(500).json({ message: 'Could not log in.' }); }
});
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('_id name email');
  if (!user) return res.status(404).json({ message: 'User not found.' });
  res.json({ user: { id: user._id, name: user.name, email: user.email } });
});
export default router;
