import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import React from 'react';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import store from './slices/index.js';
import ru from './locales/ru';

const init = async () => {
  const i18n = i18next.createInstance(); 

  await i18n
    .use(initReactI18next)
    .init({
      resources: { ru },
      fallbackLng: 'ru',
    });

  return (
    <React.StrictMode>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </Provider>
    </React.StrictMode>
  );
};

export default init;
