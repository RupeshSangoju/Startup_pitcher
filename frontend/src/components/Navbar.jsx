// frontend/src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

function Navbar({ darkMode, setDarkMode, setIsAuthenticated, isAuthenticated }) {
  const { t, i18n } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsAuthenticated(false);
    setShowMobileMenu(false);
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu((prev) => !prev);
  };

  // Hide Dashboard, Profile, Logout, and language switcher on login/signup pages or when not authenticated
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const showFullMenu = isAuthenticated && !isAuthPage;

  return (
    <motion.nav
      className="bg-white dark:bg-gray-900 shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      role="navigation"
      aria-label={t('Main navigation')}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to={isLoggedIn ? '/dashboard' : '/login'}
          className="text-2xl font-bold text-primary dark:text-white"
          aria-label={t('Pitch Generator Home')}
        >
          {t('Pitch Generator')}
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label={t('Toggle menu')}
          aria-expanded={showMobileMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={showMobileMenu ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {showFullMenu ? (
            <>
              <Link
                to="/dashboard"
                className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary"
                aria-label={t('Dashboard')}
              >
                {t('Dashboard')}
              </Link>
              <div className="relative group">
                <button
                  className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary focus:outline-none"
                  aria-label={t('Profile menu')}
                >
                  {t('Profile')}
                </button>
                <motion.div
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 hidden group-hover:block"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  role="menu"
                  aria-label={t('Profile menu')}
                >
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    role="menuitem"
                  >
                    {t('Dashboard')}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    role="menuitem"
                  >
                    {t('Logout')}
                  </button>
                </motion.div>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary"
                aria-label={t('Logout')}
              >
                {t('Logout')}
              </button>
              <select
                onChange={(e) => changeLanguage(e.target.value)}
                value={i18n.language}
                className="p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                aria-label={t('Select language')}
              >
                <option value="en">{t('English')}</option>
                <option value="es">{t('Spanish')}</option>
                <option value="fr">{t('French')}</option>
                <option value="de">{t('German')}</option>
                <option value="hi">{t('Hindi')}</option>
              </select>
            </>
          ) : null}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={darkMode ? t('Switch to light mode') : t('Switch to dark mode')}
          >
            {darkMode ? (
              <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-800 dark:text-gray-200" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <motion.div
          className="md:hidden bg-white dark:bg-gray-900 shadow-md"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col p-4 space-y-4">
            {showFullMenu ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary"
                  onClick={() => setShowMobileMenu(false)}
                  aria-label={t('Dashboard')}
                >
                  {t('Dashboard')}
                </Link>
                <Link
                  to="/dashboard"
                  className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary"
                  onClick={() => setShowMobileMenu(false)}
                  aria-label={t('Profile')}
                >
                  {t('Profile')}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary text-left"
                  aria-label={t('Logout')}
                >
                  {t('Logout')}
                </button>
                <select
                  onChange={(e) => changeLanguage(e.target.value)}
                  value={i18n.language}
                  className="p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  aria-label={t('Select language')}
                >
                  <option value="en">{t('English')}</option>
                  <option value="es">{t('Spanish')}</option>
                  <option value="fr">{t('French')}</option>
                  <option value="de">{t('German')}</option>
                  <option value="hi">{t('Hindi')}</option>
                </select>
              </>
            ) : null}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary flex items-center"
              aria-label={darkMode ? t('Switch to light mode') : t('Switch to dark mode')}
            >
              {darkMode ? t('Light Mode') : t('Dark Mode')}
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

export default Navbar;