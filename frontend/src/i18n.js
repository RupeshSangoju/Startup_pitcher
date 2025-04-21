// frontend/src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          'Create Your Startup Pitch': 'Create Your Startup Pitch',
          'Startup Name': 'Startup Name',
          'Industry': 'Industry',
          'Pitch Type': 'Pitch Type',
          'Problem': 'Problem',
          'Solution': 'Solution',
          'Target Audience': 'Target Audience',
          'Generate Pitch': 'Generate Pitch',
          'No idea? Spin the wheel!': 'No idea? Spin the wheel!',
          'Spin to Pick an Industry!': 'Spin to Pick an Industry!',
          'Spin': 'Spin',
        },
      },
      es: {
        translation: {
          'Create Your Startup Pitch': 'Crea tu Pitch de Startup',
          'Startup Name': 'Nombre de la Startup',
          'Industry': 'Industria',
          'Pitch Type': 'Tipo de Pitch',
          'Problem': 'Problema',
          'Solution': 'Solución',
          'Target Audience': 'Audiencia Objetivo',
          'Generate Pitch': 'Generar Pitch',
          'No idea? Spin the wheel!': '¿Sin ideas? ¡Gira la rueda!',
          'Spin to Pick an Industry!': '¡Gira para elegir una industria!',
          'Spin': 'Girar',
        },
      },
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;