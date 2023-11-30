import React, { useState } from 'react'
import "./Forget.css"
import {Button} from '@mui/material';
import { auth, db } from '../utilities/Firebase';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



function ForgetPassword() {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [resetEmailSent, setResetEmailSent] = useState(false);
    const [error, setError] = useState(null);
  
    const handleResetPassword = async () => {
      try {
        if (email === confirmEmail) {
          await auth.sendPasswordResetEmail(email);
          setResetEmailSent(true);
          setTimeout(() => history.push('/login'), 2000);
        } else {
          setError('Emails do not match. Please enter same email.');
          showAlert();
        }
      } catch (error) {
        setError(error.message);
        showAlert();
      }
    };

    const showAlert = () => {
        alert(error); // Display error message as an alert
      };
  return (
    <div className='forget'>
         <div className='forget__container'>
         <h2>Reset Password</h2>
      {resetEmailSent ? (
        
        <p>Password reset email sent. Check your email inbox. Redirecting to Login.....</p>
        
      ) : (
        <>
        <p>Enter your registered email below</p>
        <form className='forget__form'>
          <input type='email' required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email' />

          <input type='email' required={true} 
          value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)} 
            placeholder='Confirm Email' />
            <p>Back to Login? <a href='/login'>Sign In</a> </p>
        </form>
        <Button onClick={handleResetPassword}>Forget Password</Button>
       
        </>
      )}
        </div>
    </div>
  )
}

export default ForgetPassword