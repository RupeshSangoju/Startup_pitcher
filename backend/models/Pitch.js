// backend/models/Pitch.js
import mongoose from 'mongoose';

const pitchSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startupName: String,
  industry: String,
  problem: String,
  solution: String,
  audience: String,
  pitchType: { type: String, enum: ['elevator', 'investor', 'competition'], required: true },
  type: String, // formal, storytelling, data-driven
  text: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Pitch', pitchSchema);