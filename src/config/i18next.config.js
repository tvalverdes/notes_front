import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'

import enTranslation from '../assets/locales/en/global.json'
import esTranslation from '../assets/locales/es/global.json'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    es: {
      translation: esTranslation,
    },
  },
  lng: 'es', // Establece el idioma predeterminado
  fallbackLng: 'en', // Idioma de respaldo en caso de que falten traducciones
  debug: true, // Activa el modo de depuración
  interpolation: {
    escapeValue: false, // Permite interpolación de variables
  },
})
