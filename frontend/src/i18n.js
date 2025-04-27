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
      fr: {
        translation: {
          'Create Your Startup Pitch': 'Créez votre pitch de startup',
          'Startup Name': 'Nom de la startup',
          'Industry': 'Industrie',
          'Pitch Type': 'Type de pitch',
          'Problem': 'Problème',
          'Solution': 'Solution',
          'Target Audience': 'Public cible',
          'Generate Pitch': 'Générer le pitch',
          'No idea? Spin the wheel!': 'Pas d\'idée ? Faites tourner la roue !',
          'Spin to Pick an Industry!': 'Faites tourner pour choisir une industrie !',
          'Spin': 'Tourner',
        },
      },
      de: {
        translation: {
          'Create Your Startup Pitch': 'Erstelle deinen Startup-Pitch',
          'Startup Name': 'Startup-Name',
          'Industry': 'Branche',
          'Pitch Type': 'Pitch-Typ',
          'Problem': 'Problem',
          'Solution': 'Lösung',
          'Target Audience': 'Zielgruppe',
          'Generate Pitch': 'Pitch generieren',
          'No idea? Spin the wheel!': 'Keine Idee? Drehe das Rad!',
          'Spin to Pick an Industry!': 'Drehe, um eine Branche zu wählen!',
          'Spin': 'Drehen',
        },
      },
      hi: {
        translation: {
          'Create Your Startup Pitch': 'अपना स्टार्टअप पिच बनाएं',
          'Startup Name': 'स्टार्टअप का नाम',
          'Industry': 'उद्योग',
          'Pitch Type': 'पिच का प्रकार',
          'Problem': 'समस्या',
          'Solution': 'समाधान',
          'Target Audience': 'लक्षित दर्शक',
          'Generate Pitch': 'पिच जनरेट करें',
          'No idea? Spin the wheel!': 'कोई आइडिया नहीं? पहिया घुमाएं!',
          'Spin to Pick an Industry!': 'उद्योग चुनने के लिए पहिया घुमाएं!',
          'Spin': 'घुमाएं',
        },
      },
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
