import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { initI18n } from './i18n/i18n';

(async () => {
  const t = await initI18n();

  document.title = t('appTitle');

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
})();
