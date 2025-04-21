// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

  // Apply dark mode to <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Initialize Shepherd.js tour
  useEffect(() => {
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
        text: 'Navigate the app using the Navbar. Toggle dark mode or log in here!',
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

    return () => tour.cancel(); // Cleanup on unmount
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} className="navbar" />
        <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </Router>
    </ErrorBoundary>
  );
}

export default App;