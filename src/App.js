import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import './App.css';
import Header from './Pages/Header';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from "./Pages/Register";
import Main from "./Pages/Main";
import { useEffect, useState } from "react";
import { auth } from "./utilities/Firebase";
import Forget from "./Pages/Forget";
import WriteNote from "./Pages/WriteNote";



function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // If user is logged in, user object will be received; otherwise, user will be null
      setUser(user);
    });

    // Cleanup the observer when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <Router>
    <div className="app">
    <Switch>
          <Route path='/main'>
            {user ? <Main /> : <Home />}
          </Route>
          <Route path='/writenote'>
            {user ? <WriteNote /> : <Home />}
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/forget'>
         <Forget/>
       </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/'>
            <Header />
            <Home />
          </Route>
        </Switch>
    </div>
  </Router>

  );
}

export default App;
