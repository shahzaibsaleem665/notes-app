import React, { useEffect, useState } from 'react'
import './Main.css'
import Card from '../Components/Card'
import HeaderMain from './HeaderMain'
import add_sign from '../assets/add_sign.png'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { auth, db } from '../utilities/Firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore'
import { doc } from 'firebase/firestore'


// ... (other imports)

function Main() {
  const history = useHistory();
  const [documents, setDocuments] = useState([]);
  const [user] = useAuthState(auth);
  const [snapshot, loading, error] = useCollection(
    db.collection(`Docs/${user?.uid}/documents`).orderBy("createdAt")
  );

  const writeNote = (event) => {
    event.preventDefault();
    history.push('/writenote');
  };

  useEffect(() => {
    if (!loading && snapshot) {
      const formattedDocuments = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          fileName: data.fileName,
          content: data.content,
          timestamp: data.timestamp, // Convert Firestore timestamp to JavaScript Date
        };
      });

      setDocuments(formattedDocuments);
    }
  }, [loading, snapshot]);

  return (
    <div className='main'>
      <HeaderMain />
      <div className="main__blank" onClick={writeNote}>
        <h2>Start a new document</h2>
        <div className="main__blankCard">
          <img src={add_sign} alt="Add sign" />
          <h3>Blank document</h3>
        </div>
      </div>
      <hr />
      <h2>Recent Documents</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div className="main__container">
        {documents.map((doc) => (
          <Card key={doc.id} title={doc.fileName} description={doc.content} date={doc.timestamp} />
        ))}
      </div>
    </div>
  );
}

export default Main;
