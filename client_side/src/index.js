import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { JobsContextProvider } from "./context/JobContext";
import { ContactsContextProvider } from "./context/ContactContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <JobsContextProvider>
      {/* <App /> */}
    
    <ContactsContextProvider>
      <App />
    </ContactsContextProvider>
    </JobsContextProvider>
  </React.StrictMode>
)