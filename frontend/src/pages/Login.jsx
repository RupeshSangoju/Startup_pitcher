// frontend/src/pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { motion } from 'framer-motion';

function Login({ setIsAuthenticated }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError(t('Email and Password are required.'));
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/login`,
        { email, password }
      );
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (error) {
      setError(t(error.response?.data?.error || 'Login failed.'));
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
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{t('Login')}</h2>
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
          <button
            type="submit"
            className="w-full bg-primary text-white p-3 rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={t('Login')}
          >
            {t('Login')}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          {t('No account?')}{' '}
          <Link to="/signup" className="text-primary hover:underline">
            {t('Signup')}
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

export default Login;