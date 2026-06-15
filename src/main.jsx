/**
 * main.jsx — Application entry point
 * Renders the React app into the DOM.
 */
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <App />
  // </StrictMode>
);
