import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { flags } from './utils/flags';

if (!flags.englishBeta) {
  document.title = 'インラグデータ';
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
