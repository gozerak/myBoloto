import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './js/App';
import { UserProvider } from './js/UserContext';
// import { JobProvider } from './js/JobContext';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <UserProvider>
        {/* <JobProvider> */}
        <App />
        {/* </JobProvider> */}
      </UserProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}