// frontend/src/components/InputForm.jsx
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SpinWheel from './SpinWheel.jsx';
import { motion } from 'framer-motion';

function InputForm({ onSubmit }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    startupName: '',
    industry: '',
    problem: '',
    solution: '',
    audience: '',
    pitchType: 'investor',
  });
  const [errors, setErrors] = useState({});
  const [showWheel, setShowWheel] = useState(false);

  // Load saved form data
  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Real-time validation
  useEffect(() => {
    const newErrors = {};
    if (formData.startupName === '') newErrors.startupName = t('Startup Name is required');
    if (formData.industry === '') newErrors.industry = t('Industry is required');
    if (formData.pitchType === '') newErrors.pitchType = t('Pitch Type is required');
    if (formData.problem && formData.problem.length < 10)
      newErrors.problem = t('Problem must be at least 10 characters');
    if (formData.solution && formData.solution.length < 10)
      newErrors.solution = t('Solution must be at least 10 characters');
    setErrors(newErrors);
  }, [formData, t]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      localStorage.setItem('formData', JSON.stringify(newData));
      return newData;
    });
  };

  const handleWheelSelect = (genre) => {
    setFormData((prev) => {
      const newData = { ...prev, industry: genre };
      localStorage.setItem('formData', JSON.stringify(newData));
      return newData;
    });
    setShowWheel(false);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.startupName) newErrors.startupName = t('Startup Name is required');
    if (!formData.industry) newErrors.industry = t('Industry is required');
    if (!formData.pitchType) newErrors.pitchType = t('Pitch Type is required');
    if (formData.problem && formData.problem.length < 10)
      newErrors.problem = t('Problem must be at least 10 characters');
    if (formData.solution && formData.solution.length < 10)
      newErrors.solution = t('Solution must be at least 10 characters');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      // Reset form after submission (optional)
      setFormData({
        startupName: '',
        industry: '',
        problem: '',
        solution: '',
        audience: '',
        pitchType: 'investor',
      });
      localStorage.removeItem('formData');
    }
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      role="region"
      aria-labelledby="form-title"
    >
      <h2 id="form-title" className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        {t('Create Your Startup Pitch')}
      </h2>
      {showWheel ? (
        <SpinWheel onSelect={handleWheelSelect} />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 form">
          <div>
            <label
              htmlFor="startupName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              {t('Startup Name')} *
            </label>
            <input
              id="startupName"
              type="text"
              name="startupName"
              value={formData.startupName}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder={t('e.g., EcoGrow')}
              required
              aria-required="true"
              aria-describedby="startupName-error"
            />
            {errors.startupName && (
              <p id="startupName-error" className="text-red-500 text-sm mt-1">
                {errors.startupName}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="industry"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              {t('Industry')} *
            </label>
            <input
              id="industry"
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder={t('e.g., Agritech')}
              required
              aria-required="true"
              aria-describedby="industry-error"
            />
            <button
              type="button"
              onClick={() => setShowWheel(true)}
              className="text-primary hover:underline mt-2 spin-wheel-button"
              aria-label={t('Spin the wheel to select an industry')}
            >
              {t('No idea? Spin the wheel!')}
            </button>
            {errors.industry && (
              <p id="industry-error" className="text-red-500 text-sm mt-1">{errors.industry}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="pitchType"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              {t('Pitch Type')} *
            </label>
            <select
              id="pitchType"
              name="pitchType"
              value={formData.pitchType}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
              aria-required="true"
              aria-describedby="pitchType-error"
            >
              <option value="investor">{t('Investor')}</option>
              <option value="elevator">{t('Elevator')}</option>
              <option value="competition">{t('Competition')}</option>
            </select>
            {errors.pitchType && (
              <p id="pitchType-error" className="text-red-500 text-sm mt-1">{errors.pitchType}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="problem"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              {t('Problem')}
            </label>
            <textarea
              id="problem"
              name="problem"
              value={formData.problem}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder={t('e.g., Inefficient crop yields')}
              rows="4"
              aria-describedby="problem-error"
            />
            {errors.problem && (
              <p id="problem-error" className="text-red-500 text-sm mt-1">{errors.problem}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="solution"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              {t('Solution')}
            </label>
            <textarea
              id="solution"
              name="solution"
              value={formData.solution}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder={t('e.g., AI-powered irrigation')}
              rows="4"
              aria-describedby="solution-error"
            />
            {errors.solution && (
              <p id="solution-error" className="text-red-500 text-sm mt-1">{errors.solution}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="audience"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              {t('Target Audience')}
            </label>
            <input
              id="audience"
              type="text"
              name="audience"
              value={formData.audience}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder={t('e.g., VC investors')}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white p-3 rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={t('Generate Pitch')}
          >
            {t('Generate Pitch')}
          </button>
        </form>
      )}
    </motion.div>
  );
}

export default InputForm;