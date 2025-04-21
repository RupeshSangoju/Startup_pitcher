// backend/models/Industry.js
import mongoose from 'mongoose';

const industrySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // null for default industries
});

export default mongoose.model('Industry', industrySchema);