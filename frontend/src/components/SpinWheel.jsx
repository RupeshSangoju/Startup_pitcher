// frontend/src/components/SpinWheel.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';

function SpinWheel({ onSelect }) {
  // List of genres for the wheel
  const genres = [
    'Fintech',
    'Healthtech',
    'Edtech',
    'Agritech',
    'AI',
    'Biotech',
    'Greentech',
    'E-commerce',
  ];
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB'];

  // State for spinning status and selected genre
  const [spinning, setSpinning] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);

  // Handle spin button click
  const handleSpin = () => {
    console.log('Spin button clicked, spinning:', spinning);
    if (spinning) {
      console.log('Spin in progress, ignoring click');
      return;
    }

    try {
      setSpinning(true);
      console.log('Starting spin animation');

      // Calculate random genre and rotation
      const randomIndex = Math.floor(Math.random() * genres.length);
      const rotations = 360 * 5 + (360 / genres.length) * randomIndex;

      // Simulate spin duration (3 seconds)
      setTimeout(() => {
        const genre = genres[randomIndex];
        setSelectedGenre(genre);
        console.log('Spin complete, calling onSelect with:', genre);
        onSelect(genre);
        setSpinning(false);
      }, 3000);

      return rotations;
    } catch (error) {
      console.error('Error during spin:', error);
      setSpinning(false);
    }
  };

  // Handle keyboard interaction (Enter key to spin)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !spinning) {
      console.log('Enter key pressed for spin');
      handleSpin();
    }
  };

  // Test button to isolate click issues
  const handleTestClick = () => {
    console.log('Test button clicked');
  };

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Spin to Pick a Genre!</h3>
      <div className="relative w-96 h-96">
        {/* Wheel with conic gradient */}
        <motion.div
          className="absolute w-full h-full rounded-full shadow-lg"
          style={{
            background: `conic-gradient(${colors
              .map((color, i) => `${color} ${i * (360 / genres.length)}deg ${(i + 1) * (360 / genres.length)}deg`)
              .join(', ')})`,
          }}
          animate={{ rotate: spinning ? handleSpin() : 0 }}
          transition={{ duration: 3, ease: [0.33, 1, 0.68, 1] }}
        >
          {/* Genre labels */}
          {genres.map((genre, i) => (
            <div
              key={genre}
              className="absolute w-full h-full flex items-center justify-center"
              style={{
                transform: `rotate(${(i * 360) / genres.length}deg) translateY(-50%)`,
                transformOrigin: 'center',
              }}
            >
            <span
              className="text-lg font-bold text-black drop-shadow-md"
              style={{
                transform: 'rotate(-45deg) translateX(140px)',
                textShadow: '1px 1px 2px rgba(255,255,255,0.6)', // optional: adds contrast
              }}
            >
              {genre}
            </span>

            </div>
          ))}
        </motion.div>
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 w-0 h-0 border-l-12 border-r-12 border-t-24 border-l-transparent border-r-transparent border-t-red-600 transform -translate-x-1/2"></div>
      </div>
      {/* Spin button with tooltip */}
      <div className="group relative inline-block mt-6">
        <button
          onClick={handleSpin}
          onKeyDown={handleKeyDown}
          disabled={spinning}
          className={`px-8 py-4 rounded text-white text-lg font-semibold ${
            spinning
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary hover:bg-primary-dark cursor-pointer'
          } focus:outline-none focus:ring-2 focus:ring-primary`}
          aria-label="Spin the wheel"
          tabIndex={0}
        >
          {spinning ? 'Spinning...' : 'Spin'}
        </button>
        <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-10 left-0">
          Click or press Enter to spin
        </span>
      </div>
      {/* Test button for debugging */}
      <button
        onClick={handleTestClick}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Test Click
      </button>
      {/* Selected genre display */}
      {selectedGenre && (
        <motion.p
          className="mt-6 text-xl font-semibold text-primary dark:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Selected: {selectedGenre}
        </motion.p>
      )}
    </motion.div>
  );
}

export default SpinWheel;