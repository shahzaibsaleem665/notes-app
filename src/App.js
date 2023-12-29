import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import './App.css';
import Home from './Pages/Home';
import { useEffect, useState } from "react";
import { auth } from "./utilities/Firebase";
import WriteNote from "./Pages/WriteNote";



function App() {
  return (
    <Router>
    <div className="app">
    <Switch>
          <Route path='/writenote'>
             <WriteNote />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
    </div>
  </Router>

  );
}

export default App;
