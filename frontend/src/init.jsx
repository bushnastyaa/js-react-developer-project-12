import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { io } from 'socket.io-client';
import React from 'react';
import { Provider } from 'react-redux';
import { Provider as ProviderRollBar, ErrorBoundary } from '@rollbar/react';

import App from './components/App.jsx';
import store from './slices/index.js';
import en from './locales/en';
import ru from './locales/ru';

const init = async () => {
  const socket = io('/');
  const clear = leoProfanity.getDictionary('ru');
  leoProfanity.add(clear);
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources: { ru, en },
      fallbackLng: 'ru',
    });

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ACCESS_TOKEN,
    environment: 'production',
    captureUncaught: true,
    captureUnhandledRejections: true,
  };

  return (
    <React.StrictMode>
      <ProviderRollBar config={rollbarConfig}>
        <ErrorBoundary errorMessage="Error in the app">
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <App socket={socket} />
            </I18nextProvider>
          </Provider>
        </ErrorBoundary>
      </ProviderRollBar>
    </React.StrictMode>
  );
};

export default init;
