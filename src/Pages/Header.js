import React from 'react'
import './Header.css'
import logo from '../assets/logo.png'
import { Button } from '@mui/material'
function Header() {
  return (
    <div className='header'>
        <div className="header__left">
            <img src={logo} alt='Logo text' />
        </div>
        < div className="header__right">
            <Button className='login__button'>Log in</Button>
            <Button className='signup__button'>Sign Up</Button>
        
        </div>
    </div>
  )
}

export default Header