import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const container = document.getElementById('root');

if (!container) {
  throw new Error("Root container not found. Make sure there's an element with id='root' in your index.html.");
}

const root = ReactDOM.createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
