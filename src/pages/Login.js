import { useState } from 'react';
import styles from '../styles/login.module.css';
import { useToasts } from 'react-toast-notifications';  // its a hook
import { useAuth } from '../hooks';
import { Navigate } from 'react-router-dom';
const Login = () => {
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[logginIn,setLogginIn]=useState(false);
  const {addToast}=useToasts();
  const auth=useAuth();
  console.log(auth);
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLogginIn(true);
    if(!email || !password){
      return addToast("Please fill both the feilds",{
        appearance:'error'
      })
    }
    const res=await auth.login(email,password);;
    setLogginIn(false);
    if(res.success){
      return addToast("Logged in Successfully",{
        appearance:'success'
      })
    }
    else{
      return addToast(res.message,{
        appearance:'error'
      })
    }
  }
  // if user alredy exist then we will not rendreing this page
  if(auth.user){
    return <Navigate to='/'/>
  }
  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input type="email" placeholder="Email"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </div>

      <div className={styles.field}>
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </div>

      <div className={styles.field}>
        <button disabled={logginIn}>{logginIn ?'logging in ..':' Log In'}</button>
      </div>
    </form>
  );
};

export default Login;