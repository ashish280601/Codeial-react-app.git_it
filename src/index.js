import React from 'react';
import ReactDOM from 'react-dom/client';
import ToastContainer from 'react-toast-notification';
import './styles/index.css';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <ToastContainer autoDismiss autoDismissTimeout={5000} placement="top-left">
     <App />
    </ToastContainer> 
  // {/* </React.StrictMode> */}
);

