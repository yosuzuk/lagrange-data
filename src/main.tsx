import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { t } from './i18n/i18n';

(async () => {
  document.title = t('appTitle');

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
})();
