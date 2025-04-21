import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

function FeedbackForm({ pitch }) {
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/pitches/feedback',
        { pitchId: pitch._id, feedback },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFeedback('');
      alert('Feedback submitted!');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to submit feedback.');
    }
  };

  return (
    <motion.div
      className="mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Rate This Pitch</h4>
      {error && (
        <motion.p
          className="text-red-500 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          role="alert"
        >
          {error}
        </motion.p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600"
          placeholder="e.g., Too formal, needs more data"
          rows="4"
          aria-label="Feedback for pitch"
        />
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Submit feedback"
        >
          Submit Feedback
        </button>
      </form>
    </motion.div>
  );
}

export default FeedbackForm;