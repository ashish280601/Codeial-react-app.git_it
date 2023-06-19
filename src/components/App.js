import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import { getPosts } from '../api';
import { Home, Login } from '../pages';
import { Loader, Navbar } from './';

const About = () => {
  return <h1>About</h1>;
};

const UserInfo = () => {
  return <h1>User</h1>;
};

const Page404 = () => {
  return <h1>Page 404</h1>;
};

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      console.log('response', response);
      if (response.success) {
        setPosts(response.data.posts);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home posts={posts} />} />
          <Route path="/about" element={<About />} />
          <Route path="/userinfo" element={<UserInfo />} />
          <Route path="/login" element={<Login />} />
          <Route element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
