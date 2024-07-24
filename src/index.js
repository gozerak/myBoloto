import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './js/App';
import { UserProvider } from './js/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
