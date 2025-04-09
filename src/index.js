import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId="861236663472-sa3v01inonk082su43fo069hlfqfn77o.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);