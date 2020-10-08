import React from 'react';
import './App.css';
import { Landing } from './containers/landing/landing';
import Register from './containers/register/register';
import Login from './containers/login/login';
import { BrowserRouter, Route, Switch } from "react-router-dom";

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
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
