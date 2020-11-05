import React from 'react';
import './App.css';
import Landing from './containers/landing/landing';
import Register from './containers/register/Register';
import Login from './containers/login/login';
import Profile from './containers/profile/profile.jsx';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path = "/">
            <Landing/>
          </Route>
          <Route exact path = "/register">
            <Register/>
          </Route>
          <Route exact path = "/login">
            <Login/>
          </Route>
          <Route exact path = "/profile/:userid">
            <Profile/>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
