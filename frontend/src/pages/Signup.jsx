// frontend/src/pages/Signup.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { motion } from 'framer-motion';

function Signup({ setIsAuthenticated }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError(t('All fields are required.'));
      return;
    }
    if (password.length < 6) {
      setError(t('Password must be at least 6 characters long.'));
      return;
    }
    if (password !== confirmPassword) {
      setError(t('Passwords do not match.'));
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/signup`,
        { email, password }
      );
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      navigate('/login');
    } catch (error) {
      setError(t(error.response?.data?.error || 'Signup failed.'));
    }
  };

  return (
    <motion.div
      className="container mx-auto p-4 sm:p-6 flex justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{t('Signup')}</h2>
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              {t('Email')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder={t('e.g., user@example.com')}
              required
              aria-required="true"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              {t('Password')}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
              aria-required="true"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              {t('Re-enter Password')}
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
              aria-required="true"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white p-3 rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={t('Signup')}
          >
            {t('Signup')}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          {t('Already have an account?')}{' '}
          <Link to="/login" className="text-primary hover:underline">
            {t('Login')}
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

export default Signup;