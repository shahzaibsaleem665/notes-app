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


function App() {
  return (
    <Router>
    <div className="app">
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/'>
          <Header />
          <Home />
        </Route>
        <Route path='/main'>
          <Main />
        </Route>
      </Switch>
    </div>
  </Router>

  );
}

export default App;
