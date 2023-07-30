import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Create a root ReactDOM instance using Concurrent Mode
const root = document.getElementById('root');
const rootElement = ReactDOM.createRoot(root);

// Render the App component inside the root element
rootElement.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
