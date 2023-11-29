import React, { useState } from 'react'
import "./Login.css"
import { Button } from '@mui/material'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom';

function Login() {
    const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return (
    <div className='login'>
         <div className='login__container'>
        <h2>Sign In</h2>
        <p>Enter credentials below</p>
        <form className='login__form'>
          <input type='email' required={true} value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
          <input type='password' required={true} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
          <p>Forgot password? <a href='/forgetPassword'>Reset Password</a> </p>
        </form>
        <Link>
        <Button onClick={() => history.push('/main')}> Sign In</Button>
        </Link>
        </div>
    </div>
  )
}

export default Login