// backend/routes/industries.js
import express from 'express';
import Industry from '../models/Industry.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const defaultIndustries = await Industry.find({ userId: null });
    const userIndustries = await Industry.find({ userId: req.user.userId });
    res.json([...defaultIndustries, ...userIndustries]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  const { name } = req.body;
  try {
    const industry = new Industry({ name, userId: req.user.userId });
    await industry.save();
    res.status(201).json(industry);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;