import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../hooks';
import styles from '../styles/login.module.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signingUp, setSigningUp] = useState('');
  const { addToast } = useToasts();
  const auth = useAuth();
  const history = useNavigate();  // this is browser history act as stack
  // console.log("history obj",history);

  const handleFormSubmit = async (e) => {
   
    e.preventDefault();
    setSigningUp(true);
      console.log(name,email,password,confirmPassword);
    let error = false;
    if (!name || !email || !password || !confirmPassword) {
      addToast('Please fill all the fields', {
        appearance: 'error',
        autoDismiss: true,
      });
      error = true;
    }

    if (password !== confirmPassword) {
      addToast('Make sure password and confirm password matches', {
        appearance: 'error',
        autoDismiss: true,
      });

      error = true;
    }

    if (error) {
      return setSigningUp(false);
    }

    const response = await auth.signup(name, email, password, confirmPassword);
    

    if (response.success) {
      // this history.push will basicall push the login page to the stack and we will be redirected to it 
      // history.push('/login');
      // <Navigate to='/login'/>
      history('/login');   // and this will redirect us to the login page via this url
      setSigningUp(false);

      return addToast('User registered successfully, please login now', {
        appearance: 'success',
        autoDismiss: true,
      });
    } else {
      console.log(response.message);
      addToast(response.message, {
        appearance: 'error',
        autoDismiss: true,
      });
    }

    setSigningUp(false);
  };
  // if user alredy exist then we will not rendreing this page
  if(auth.user){
    return <Navigate to='/'/>
  }
  return (
    <form className={styles.loginForm} onSubmit={handleFormSubmit}>
      <span className={styles.loginSignupHeader}> Signup</span>
      <div className={styles.field}>
        <input
          placeholder="Name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Confirm Password"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <button disabled={signingUp}>
          {signingUp ? 'Signing up...' : 'Signup'}
        </button>
      </div>
    </form>
  );
};

export default Signup;
