import React from 'react'
import './Header.css'
import logo from '../assets/logo.png'
import { Button } from '@mui/material'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom'

function Header() {
 const history = useHistory();
  return (
    <div className='header'>
        <div className="header__left">
            <img src={logo} alt='Logo text' />
        </div>
        < div className="header__right">
          <Link to='/login'>
            <Button className='login__button' onClick={() => history.push('/login')}>Log in </Button>
            </Link>
            <Link to='/register'>
            <Button className='signup__button' onClick={() => history.push('/register')}>Sign Up</Button>
            </Link>
        </div>
    </div>
  )
}

export default Header