import { useState, useEffect } from 'react';
import InputForm from '../components/InputForm.jsx';
import PitchDisplay from '../components/PitchDisplay.jsx';
import axios from 'axios';
import { motion } from 'framer-motion';

function Home() {
  const [pitches, setPitches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch user pitches on mount
  useEffect(() => {
    const fetchPitches = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/pitches', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPitches(response.data);
      } catch (error) {
        console.error('Fetch pitches error:', error);
      }
    };
    fetchPitches();
  }, []);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/pitches/generate',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPitches([...pitches, ...response.data]);
    } catch (error) {
      console.error('Error generating pitches:', error);
      setError('Failed to generate pitches. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="container mx-auto p-4 sm:p-6 lg:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <InputForm onSubmit={handleSubmit} />
      {loading && (
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          <p className="text-primary mt-2">Generating pitches...</p>
        </motion.div>
      )}
      {error && (
        <motion.p
          className="text-center text-red-500 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {error}
        </motion.p>
      )}
      <PitchDisplay pitches={pitches} />
    </motion.div>
  );
}

export default Home;