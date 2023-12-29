import React from 'react'
import './Home.css'
import logo from '../assets/logo.png'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Link } from '@mui/material';

function Home() {
  const history = useHistory();
  const navigate = () => {
    history.push('/writenote');
  }
  return (
    <div className='home' >
        <div className="home__container">
            <h1>Create Pdf with...</h1>
        </div>
        <div className="home__image">
          <Link to='/writenote'>
            <img src={logo} alt='Home logo' onClick={navigate} />
            </Link>
        </div>
    </div>
  )
}

export default Home