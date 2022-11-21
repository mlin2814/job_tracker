/*
CODE CITATION
Title: MERN Auth tutorial source code
Author: The Net Ninja
Date: 2022
Type: Adapted from
Source: https://github.com/iamshaunjp/MERN-Auth-Tutorial
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { JobsContextProvider } from "./context/JobContext";
import { ContactsContextProvider } from "./context/ContactContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <JobsContextProvider>
        <ContactsContextProvider>
          <App />
        </ContactsContextProvider>
      </JobsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)