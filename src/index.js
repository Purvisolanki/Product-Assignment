import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Toaster } from 'react-hot-toast';
import StoreProvider from './context/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <StoreProvider>
        <Toaster />
        <App />
    </StoreProvider>
  </>
);

reportWebVitals();
