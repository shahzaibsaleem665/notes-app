
import firebase from  "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC63z3ZGKmEF5hGJfztOMV3CtcGv8KYqUU",
  authDomain: "notes-app-32aa2.firebaseapp.com",
  projectId: "notes-app-32aa2",
  storageBucket: "notes-app-32aa2.appspot.com",
  messagingSenderId: "588575462509",
  appId: "1:588575462509:web:ba4c5da4a05694d954db64",
  measurementId: "G-7MNSKNQYCW"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

export {db, auth, app};