// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Shepherd from 'shepherd.js';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import 'shepherd.js/dist/css/shepherd.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  // Apply dark mode to <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Update authentication state
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  // Shepherd.js Tour Component
  const Tour = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
      if (location.pathname === '/dashboard' && isAuthenticated) {
        const tour = new Shepherd.Tour({
          defaultStepOptions: {
            cancelIcon: { enabled: true },
            classes: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg p-4 rounded-lg',
          },
          useModalOverlay: true,
        });

        tour.addSteps([
          {
            id: 'navbar',
            text: 'Navigate the app using the Navbar. Toggle dark mode or log out here!',
            attachTo: { element: '.navbar', on: 'bottom' },
            buttons: [
              {
                text: 'Next',
                action: tour.next,
              },
            ],
          },
          {
            id: 'form',
            text: 'Fill out this form to generate your startup pitch.',
            attachTo: { element: '.form', on: 'bottom' },
            buttons: [
              {
                text: 'Next',
                action: tour.next,
              },
            ],
          },
          {
            id: 'spin-wheel',
            text: 'Spin the wheel if you need industry inspiration!',
            attachTo: { element: '.spin-wheel-button', on: 'bottom' },
            buttons: [
              {
                text: 'Finish',
                action: tour.cancel,
              },
            ],
          },
        ]);

        tour.start();

        return () => tour.cancel();
      }
    }, [location]);

    return children;
  };

  return (
    <ErrorBoundary>
      <Router>
        <Tour>
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} className="navbar" />
          <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <Routes>
              <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </main>
        </Tour>
      </Router>
    </ErrorBoundary>
  );
}

export default App;