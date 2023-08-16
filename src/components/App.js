import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home, Login, Signup, Settings,UserProfile } from '../pages';
import { Loader, Navbar } from './';
import { useAuth } from '../hooks';

// implementing our own private route function
function PrivateRoute({ children}) {  // routes get stored in children and their props get into the rest 
  const auth = useAuth();
  if(auth.user){
   return children
  }
  else{
    return <Navigate to='/login'/>
  }

    // <Route  // when the privateRoute get matches this Route get rendered and then the below render function get called
    //   {...rest} //*** this rest is the 'exact path' attribute

    //   render={() => {  // we using this render prop beacuse we want to render under some conditions

    //     if (auth.user) {  // if user is present then we simple return the children

    //       return children //***  this children is the component which we want to render
    //     }
    //     return <Navigate to='/login' />  // or else when the user is not present we will redirect it to the login
    //   }}
    // />

}

const Page404 = () => {
  return <h1>Page 404</h1>;
};

function App() {
  // const [loading, setLoading] = useState(true);
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Signup />} />
          <Route exact path="/settings" element={<PrivateRoute><Settings/></PrivateRoute>} />
          <Route exact path="/user/:userId" element={<PrivateRoute><UserProfile/></PrivateRoute>} />
          <Route exact path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;