import React, { useEffect, useState } from 'react'
import './Main.css'
import Card from '../Components/Card'
import HeaderMain from './HeaderMain'
import add_sign from '../assets/add_sign.png'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { auth, db } from '../utilities/Firebase'


function Main() {
  const history = useHistory();
  const [documents, setDocuments] = useState([]);
  const user = auth.currentUser;
 

  const writeNote = (event) => {
    event.preventDefault();
    history.push('/writenote');
  };

  useEffect(() => {
    if (user) {
      db.collection('Docs').where('userId', '==', user.uid).onSnapshot((snapshot) => setDocuments(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
        )
        );
        console.error('error in documents: ', Error);
    }
  }, []);

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
      <div className="main__container">
      {documents.map(({id, data : {content, fileName, timestamp, }}) => (
        <Card
        id={id} 
        key={id}
        title={fileName}
        description={content}
        date={timestamp}
        />
      ))}
      console.log(data);
      </div>
    </div>
  );
}

export default Main;
