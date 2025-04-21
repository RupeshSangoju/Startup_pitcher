// frontend/src/components/PitchDisplay.jsx
import { useState } from 'react';
import PitchModal from './PitchModal.jsx';
import FeedbackForm from './FeedbackForm.jsx';
import axios from 'axios';
import { motion } from 'framer-motion';

function PitchDisplay({ pitches, setPitches }) {
  const [selectedPitch, setSelectedPitch] = useState(null);
  const [editingPitch, setEditingPitch] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEdit = (pitch) => {
    setEditingPitch(pitch);
    setEditText(pitch.text);
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/pitches/${editingPitch._id}`,
        { text: editText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPitches(pitches.map(p => p._id === response.data._id ? response.data : p));
      setEditingPitch(null);
      setEditText('');
    } catch (error) {
      console.error('Edit pitch error:', error);
    }
  };

  return (
    <motion.div
      className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {pitches.map((pitch) => (
        <div
          key={pitch._id}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-bold capitalize text-gray-900 dark:text-white">
            {pitch.type} Pitch
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{pitch.text.slice(0, 100)}...</p>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => setSelectedPitch(pitch)}
              className="text-primary hover:underline"
            >
              View Details
            </button>
            <button
              onClick={() => handleEdit(pitch)}
              className="text-primary hover:underline"
            >
              Edit
            </button>
          </div>
          <FeedbackForm pitch={pitch} />
        </div>
      ))}
      {selectedPitch && (
        <PitchModal pitch={selectedPitch} onClose={() => setSelectedPitch(null)} />
      )}
      {editingPitch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">Edit Pitch</h3>
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
              rows="6"
            />
            <div className="mt-4 flex space-x-4">
              <button
                onClick={handleSaveEdit}
                className="bg-primary text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditingPitch(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default PitchDisplay;