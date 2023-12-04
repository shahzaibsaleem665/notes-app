import React from 'react'
import './Main.css'
import Card from '../Components/Card'
import HeaderMain from './HeaderMain'
import add_sign from '../assets/add_sign.png'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'



function Main() {

  const history = useHistory();

  const writeNote = (event) => {
    event.preventDefault();
    history.push('/writenote');
  }
  return (
    <div className='main'>
      <HeaderMain />
      <div className="main__blank" onClick={writeNote}>
        <h2>Start a new document</h2>
        <div className="main__blankCard">
          <img src={add_sign}  />
          <h3>Blank document</h3>
        </div>
      </div>
      <hr></hr>
      <h2>Recent Documents</h2>
      <div className="main__container">
        <Card  title="New Doc" description="New document added" date="10 May 2023" />
        <Card  title="New Doc" description="New document added" date="10 May 2023" />
        <Card  title="New Doc" description="New document added" date="10 May 2023" />
        <Card  title="New Doc" description="New document added" date="10 May 2023" />
        <Card  title="New Doc" description="New document added" date="10 May 2023" />
      </div>
    </div>
  )
}

export default Main