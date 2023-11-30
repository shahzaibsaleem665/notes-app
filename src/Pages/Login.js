import React, { useState } from 'react'
import "./Login.css"
import { Button } from '@mui/material'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom';
import { auth, db } from '../utilities/Firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/app'

function Login() {
    const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password).then((usercred) => {
      const user = usercred.user;
      db.collection('User SignIN').doc(user.uid).set({
        userMail: user.email,
        loginTime: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        alert('User Signed in');
      history.push('/main');
     
      })
    }).catch((error) => alert(error.message));
  }


  return (
    <div className='login'>
         <div className='login__container'>
        <h2>Sign In</h2>
        <p>Enter your credentials below</p>
        <form className='login__form'>
          <input type='email' required={true} value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
          <input type='password' required={true} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
          <p>Forgot password? <a href='/forgetPassword'>Reset Password</a> </p>
        </form>
        <Link to='/main'>
        <Button className='signin__button' onClick={signIn}> Sign In</Button>
        </Link>
        </div>
    </div>
  )
}

export default Login