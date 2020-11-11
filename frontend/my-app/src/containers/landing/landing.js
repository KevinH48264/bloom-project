import React from "react";
import { Link } from 'react-router-dom';
import './../../components/landing/landing.css';
import { Container, Row, Col } from 'react-bootstrap';
import logo from './../../components/landing/logo.png';

class Landing extends React.Component {
  contructor(props){
    this.state = {dummy: ''};
  }

  render(){
    return(
      <>
      <table>
      <tr>
      <h1>Welcome!</h1>
      </tr>
      <tr>
      <hr/>
      </tr>
      <tr>
      <img src = {logo}/>
      </tr>
      <tr>
      <hr/>
      </tr>
      <tr>
        <Link to = "/register">
          <button className="btn btn1">Sign Up</button>
        </Link>
        </tr>
      <tr>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </tr>

        </table>
      </>
    );
  }
}

export default Landing;
