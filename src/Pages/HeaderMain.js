import React from 'react'
import './HeaderMain.css'
import { Avatar } from '@mui/material'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import {auth} from '../utilities/Firebase'
import LogoutIcon from '@mui/icons-material/Logout';
import logo from "../assets/logo.png"
function HeaderMain() {
    const history = useHistory();

    const signOut = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior, if applicable
      
        auth
          .signOut()
          .then(() => {
            history.push('/');
          })
          .catch((error) => {
            // Handle sign-out errors, if any
            console.error('Error signing out:', error);
          });
};

  return (
    <div className='headerMain'>
          <div className="header__left">
            <img src={logo} alt='Logo text' />
        </div>
        < div className="header__right">
            <Avatar src={logo} />
            <LogoutIcon className='logout' onClick={signOut} />
        </div>
    </div>
  )
}

export default HeaderMain