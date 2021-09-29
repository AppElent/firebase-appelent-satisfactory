import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export { I18nextProvider } from 'react-i18next';

/*
    Translations
*/
const resources = {
  en: {
    common: {
      greet: 'Hello',
      greetName: 'Hello {{name}}',
      buttons: {
        cancel: 'Cancel',
        save: 'Save',
        login: 'Login',
        logout: 'Logout',
        new: 'New',
        connect: 'Connect',
        delete: 'Delete'
      }
    }
  },
  nl: {
    common: {
      greet: 'Hallo',
      greetName: 'Hallo {{name}}',
      buttons: {
        cancel: 'Annuleer',
        save: 'Sla op',
        login: 'Log in',
        logout: 'Log uit',
        new: 'Nieuw',
        connect: 'Verbind',
        delete: 'Verwijder'
      }
    }
  }
};

i18n.use(LanguageDetector).init({
  // we init with resources
  resources,
  fallbackLng: 'en',
  debug: false,

  // have a common namespace used around the full app
  ns: ['common'],
  defaultNS: 'common',

  // keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ',',
  },

  react: {
    wait: true,
  },
});

export default i18n;
