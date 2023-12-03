import React from 'react'
import './HeaderMain.css'
import { Avatar, IconButton } from '@mui/material'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import {auth} from '../utilities/Firebase'
import LogoutIcon from '@mui/icons-material/Logout';
import logo1 from "../assets/logo1.png"
import logo from "../assets/logo.png";
import SearchIcon from '@mui/icons-material/Search';
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
        <div className="headerMain__middle">
          <input type='text' placeholder='search'/>
          <SearchIcon />
          
        </div>
        < div className="header__right">
            <Avatar className='headerMain__avatar' src={logo1.png} />
            <IconButton>
            <LogoutIcon className='logout' onClick={signOut} />
            </IconButton>
        </div>
    </div>
  )
}

export default HeaderMain