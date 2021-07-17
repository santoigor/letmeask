import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './_services/firebase'
import './_styles/global.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

