import React from 'react'
import './Header.css'
import logo from '../assets/logo.png'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom/cjs/react-router-dom'

function Header() {
 
  return (
    <div className='header'>
        <div className="header__left">
            <img src={logo} alt='Logo text' />
        </div>
        < div className="header__right">
          <Link to='/login'>
            <Button className='login__button' >Log in </Button>
            </Link>
            <Button className='signup__button'>Sign Up</Button>
        
        </div>
    </div>
  )
}

export default Header