// frontend/src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

function Dashboard() {
  const [pitches, setPitches] = useState([]);
  const [filters, setFilters] = useState({ industry: '', pitchType: '' });

  useEffect(() => {
    fetchPitches();
  }, [filters]);

  const fetchPitches = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/pitches', {
        headers: { Authorization: `Bearer ${token}` },
        params: filters,
      });
      setPitches(response.data);
    } catch (error) {
      console.error('Fetch pitches error:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      className="container mx-auto p-4 sm:p-6 lg:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Dashboard</h2>
      <div className="mb-6 flex space-x-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Filter by Industry
          </label>
          <input
            type="text"
            name="industry"
            value={filters.industry}
            onChange={handleFilterChange}
            className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
            placeholder="e.g., Agritech"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Filter by Pitch Type
          </label>
          <select
            name="pitchType"
            value={filters.pitchType}
            onChange={handleFilterChange}
            className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
          >
            <option value="">All</option>
            <option value="elevator">Elevator</option>
            <option value="investor">Investor</option>
            <option value="competition">Competition</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-3 text-left">Startup Name</th>
              <th className="p-3 text-left">Industry</th>
              <th className="p-3 text-left">Pitch Type</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {pitches.map((pitch) => (
              <tr key={pitch._id} className="border-b dark:border-gray-600">
                <td className="p-3">{pitch.startupName}</td>
                <td className="p-3">{pitch.industry}</td>
                <td className="p-3 capitalize">{pitch.pitchType}</td>
                <td className="p-3 capitalize">{pitch.type}</td>
                <td className="p-3">{new Date(pitch.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default Dashboard;