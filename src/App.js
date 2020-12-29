// import logo from './logo.svg';
import './App.css';
import Login from "./components/Login.js"
import DashBoard from "./components/Dashboard.js"
import NotFound404 from "./components/NotFound404"
import { BrowserRouter as Router,Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>

        <Route path="/" exact component={ Login }/>
        <Route path ="/erp/dashboard" exact component = { DashBoard }/>
        <Route path='*' component={ NotFound404 }/>

        </Switch>
      </Router>

    </div>
  );
}

export default App;
