import React from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Home, Login } from '../pages';
import { Loader, Navbar } from './';
import { useAuth } from '../hooks';
import Signup from '../pages/Signup';

const Page404 = () => {
  return <h1>Page 404</h1>;
};

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
