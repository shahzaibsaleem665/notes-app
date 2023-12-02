import React from 'react'
import './Main.css'
import Card from '../Components/Card'
import HeaderMain from './HeaderMain'

function Main() {
  return (
    <div className='main'>
      <HeaderMain />
      <div className="main__container">
        <Card  title="New Doc" description="New document added" date="10 May 2023" />
        <Card  title="New Doc" description="New document added" date="10 May 2023" />
        <Card  title="New Doc" description="New document added" date="10 May 2023" />

        <Card  title="New Doc" description="New document added" date="10 May 2023" />
        <Card  title="New Doc" description="New document added" date="10 May 2023" />

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