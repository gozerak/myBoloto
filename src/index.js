import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './js/App';
import { UserProvider } from './js/UserContext';
import { JobProvider } from './js/JobContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <JobProvider>
      <App />
      </JobProvider>
    </UserProvider>
  </React.StrictMode>
);
