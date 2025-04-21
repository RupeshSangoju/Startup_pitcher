// backend/seed.js
import mongoose from 'mongoose';
import Industry from './models/Industry.js';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log('Connected to MongoDB');
  const industries = [
    'Fintech',
    'Healthtech',
    'Edtech',
    'Agritech',
    'AI',
    'Biotech',
    'Greentech',
    'E-commerce',
  ];
  await Industry.deleteMany({ userId: null });
  await Industry.insertMany(industries.map((name) => ({ name })));
  console.log('Default industries seeded');
  mongoose.disconnect();
});