import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  pitchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pitch', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  feedback: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Feedback', feedbackSchema);