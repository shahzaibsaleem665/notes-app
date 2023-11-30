import React, { useState } from 'react'
import './Register.css'
import { Button } from '@mui/material';
import { auth, db } from '../utilities/Firebase';
import firebase from  "firebase/compat/app";
import 'firebase/compat/firestore';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


function Register() {
  const history = useHistory();
  const [email, setEmail]= useState('');
  const [fullname, setFullName]= useState('');
  const [password, setPassword]= useState('');


  const signUp = () => {
  auth.createUserWithEmailAndPassword(email, password).then((usercred) => {
    db.collection('Users').add({
      Email : usercred.user.email,
      Password: password,
      Name: fullname,
      Timestamp : firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      alert('User Added!');
      history.push('/main');
    })
   })
   

  }
  return (
    <div className='register'>
       <div className='register__container'>
        <h2>Sign Up</h2>
        <p>Enter your details below</p>
        <form className='register__form'>
          <input type='text' required={true} value={fullname} onChange={(e) => setFullName(e.target.value)} placeholder='Full name'/>
          <input type='email' required={true} value={email} onChange={(e) => setEmail(e.target.value)}placeholder='Email' />
          <input type='password' required={true} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
         
          <p>Already have an account? <a href='/login'>Sign in</a> </p>
        </form>


        <Button onClick={signUp}> Create Account</Button>
        </div>
        
    </div>
  )
}

export default Register