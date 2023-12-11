import React, { useEffect, useState } from 'react'
import './Main.css'
import Card from '../Components/Card'
import HeaderMain from './HeaderMain'
import add_sign from '../assets/add_sign.png'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { auth, db } from '../utilities/Firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'



function Main() {

  const history = useHistory();
  const [documents, setDocuments] = useState([]);
  const [user] = useAuthState(auth);
  const [docs, loading] = useCollectionData(
    db.collection(`Docs/${user?.uid}/documents`).orderBy("createdAt")
  );

  const writeNote = (event) => {
    event.preventDefault();
    history.push('/writenote');
  }


  useEffect(() => {
    // Update the local state with the documents from Firestore
    if (!loading && docs) {
      setDocuments(docs);
    }
  }, [loading, docs]);


  
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