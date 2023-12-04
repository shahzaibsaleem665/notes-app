import React from 'react'
import "./Card.css"

function Card({title, description, date}) {
 
  return (
    <div className='card'>
        <h1>{title}</h1>
        <div className="card__info">
            <h3>{description}</h3>
            <p>{date}</p>
        </div>
    </div>
  )
}

export default Card