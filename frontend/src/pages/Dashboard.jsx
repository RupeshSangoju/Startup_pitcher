// frontend/src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import InputForm from '../components/InputForm.jsx';
import PitchDisplay from '../components/PitchDisplay.jsx';
import { motion } from 'framer-motion';

function Dashboard() {
  const { t } = useTranslation();
  const [pitches, setPitches] = useState([]);

  useEffect(() => {
    const fetchPitches = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/pitches`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPitches(response.data);
      } catch (error) {
        console.error('Fetch pitches error:', error);
      }
    };
    fetchPitches();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/pitches/generate`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPitches([response.data, ...pitches]);
    } catch (error) {
      console.error('Generate pitch error:', error);
    }
  };

  return (
    <motion.div
      className="container mx-auto p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-700 dark:text-gray-200">{t('Dashboard')}</h2>
      <InputForm onSubmit={handleSubmit} />
      <PitchDisplay pitches={pitches} setPitches={setPitches} />
    </motion.div>
  );
}

export default Dashboard;