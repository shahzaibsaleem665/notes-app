import React from 'react'
import './Home.css'
import home from '../assets/home.svg'

function Home() {
  return (
    <div className='home' >
        <div className="home__container">
            <h1>Create Notes With</h1>
        </div>
        <div className="home__image">
            <img src={home} alt='Home logo' />
        </div>
    </div>
  )
}

export default Home