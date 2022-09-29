import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { t } from './i18n/i18n';

(async () => {
  document.title = t('appTitle');

  const root = createRoot(document.getElementById('root')!);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
})();
