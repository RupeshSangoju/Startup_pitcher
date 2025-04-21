// frontend/src/components/PitchModal.jsx
import { useRef } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { motion } from 'framer-motion';

function PitchModal({ pitch, onClose }) {
  const modalRef = useRef();

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`${pitch.startupName} - ${pitch.type} Pitch`, 20, 20);
    autoTable(doc, {
      startY: 30,
      head: [['Field', 'Details']],
      body: [
        ['Industry', pitch.industry],
        ['Problem', pitch.problem || 'N/A'],
        ['Solution', pitch.solution || 'N/A'],
        ['Audience', pitch.audience || 'N/A'],
        ['Pitch Type', pitch.pitchType],
        ['Text', pitch.text],
      ],
      theme: 'striped',
    });
    doc.save(`${pitch.startupName}_${pitch.type}_pitch.pdf`);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-lg w-full"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {pitch.startupName} - {pitch.type} Pitch
        </h2>
        <p><strong>Industry:</strong> {pitch.industry}</p>
        <p><strong>Problem:</strong> {pitch.problem || 'N/A'}</p>
        <p><strong>Solution:</strong> {pitch.solution || 'N/A'}</p>
        <p><strong>Audience:</strong> {pitch.audience || 'N/A'}</p>
        <p><strong>Pitch Type:</strong> {pitch.pitchType}</p>
        <p className="mt-4">{pitch.text}</p>
        <div className="mt-6 flex space-x-4">
          <button
            onClick={handleDownloadPDF}
            className="bg  -primary text-white px-4 py-2 rounded"
          >
            Download as PDF
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default PitchModal;