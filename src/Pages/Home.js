import React from 'react'
import './Home.css'
import home from '../assets/home.svg'

function Home() {
  return (
    <div className='home' >
        <div className="home__container">
            <h1>Welcome to Notes....!!!</h1>
        </div>
        <div className="home__image">
            <img src={home} />
        </div>
    </div>
  )
}

export default Home