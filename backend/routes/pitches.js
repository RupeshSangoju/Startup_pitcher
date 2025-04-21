// backend/routes/pitches.js
import express from 'express';
import Pitch from '../models/Pitch.js';
import { auth } from '../middleware/auth.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Generate pitches with Groq API
router.post('/generate', auth, async (req, res) => {
  const { startupName, industry, problem, solution, audience, pitchType } = req.body;
  try {
    // Validate inputs
    if (!startupName || !industry || !pitchType) {
      return res.status(400).json({ error: 'Startup Name, Industry, and Pitch Type are required' });
    }

    // Construct prompt for Groq API
    const prompt = `Generate three ${pitchType} pitches (formal, storytelling, data-driven) for a startup named ${startupName} in the ${industry} industry. The problem is: ${problem}. The solution is: ${solution}. Target audience: ${audience}. Each pitch should be 100-150 words, concise, and compelling. Return the pitches as a JSON array with objects containing 'type' and 'text' fields.`;

    // Call Groq API
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.1-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Parse Groq response
    const pitchesText = response.data.choices[0].message.content;
    let pitchVariations;
    try {
      pitchVariations = JSON.parse(pitchesText);
    } catch {
      // Fallback if response isn’t JSON
      pitchVariations = [
        { type: 'formal', text: pitchesText.slice(0, 150) + '...' },
        { type: 'storytelling', text: pitchesText.slice(150, 300) + '...' },
        { type: 'data-driven', text: pitchesText.slice(300, 450) + '...' },
      ];
    }

    // Save pitches to MongoDB
    const pitches = pitchVariations.map((pitch) => ({
      userId: req.user.userId,
      startupName,
      industry,
      problem,
      solution,
      audience,
      pitchType,
      type: pitch.type,
      text: pitch.text,
      createdAt: new Date(),
    }));

    await Pitch.insertMany(pitches);
    res.json(pitches);
  } catch (error) {
    console.error('Generate pitches error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate pitches' });
  }
});

// Other routes (get pitches, feedback) remain unchanged
router.get('/', auth, async (req, res) => {
  try {
    const pitches = await Pitch.find({ userId: req.user.userId });
    res.json(pitches);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/feedback', auth, async (req, res) => {
  const { pitchId, feedback } = req.body;
  try {
    const newFeedback = new Feedback({
      pitchId,
      userId: req.user.userId,
      feedback,
    });
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

router.put('/:id', auth, async (req, res) => {
  const { text } = req.body;
  try {
    const pitch = await Pitch.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!pitch) {
      return res.status(404).json({ error: 'Pitch not found' });
    }
    pitch.text = text;
    await pitch.save();
    res.json(pitch);
  } catch (error) {
    console.error('Edit pitch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const { industry, pitchType } = req.query;
    const query = { userId: req.user.userId };
    if (industry) query.industry = industry;
    if (pitchType) query.pitchType = pitchType;
    const pitches = await Pitch.find(query).sort({ createdAt: -1 });
    res.json(pitches);
  } catch (error) {
    console.error('Get pitches error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});