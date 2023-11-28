import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import './App.css';
import Header from './Pages/Header';
import Home from './Pages/Home';
import Login from './Pages/Login';


function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login' >
      <Login />
      </Route>
      </Switch>
    <div className="app">
      <Header />
      <Home />
      
    </div>
    </Router>
  );
}

export default App;
