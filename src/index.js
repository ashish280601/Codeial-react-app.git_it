import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { ToastProvider } from 'react-toast-notifications';
import { App } from './components/index';
import { AuthProvider ,PostProvider} from './providers';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrapping the whole app around the toast notification */}
    <ToastProvider autoDismiss autoDismissTimeout={5000} placement="top-left">
     {/* wrapping our component inside the auth porvider */}
      <AuthProvider>  
        {/* we are not wrapping the authprovider inside the postprovider because we might need authentication further so thats why we wrape the postprovider inside the authprovider */}
        <PostProvider>
        <App />
        </PostProvider>
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>
);