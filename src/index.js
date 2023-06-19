import React from 'react';
import ReactDOM from 'react-dom/client';
// import ToastContainer from 'react-toast-notification';
import './styles/index.css';
import App from './components/App';
import { ToastProvider } from 'react-toast-notifications';
import { AuthProvider } from './providers/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastProvider autoDismiss autoDismissTimeout={5000} placement="top-left">
      <AuthProvider>
        <App />
      </AuthProvider>
    </ToastProvider> 
  </React.StrictMode> 
);

