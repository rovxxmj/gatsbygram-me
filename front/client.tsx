import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './layouts/App';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://gatsbygram.com' : 'http://localhost:3090';

render(
  <BrowserRouter>
    <ToastContainer />
    <App />
  </BrowserRouter>,
  document.querySelector('#app'),
);
