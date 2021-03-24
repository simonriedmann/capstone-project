import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { GlobalStyles } from './GlobalStyles';
import './index.css'

/*
ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/


ReactDOM.render(
  <>
    <Router>
      <GlobalStyles />
      <App />
    </Router>

  </>,
  document.getElementById('root')
);
