import React from "react";
import { Link } from 'react-router-dom';
import '../../components/landing/landing.css';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../../components/landing/logo.png';

class Landing extends React.Component {
  contructor(props){
    this.state = {dummy: ''};
  }

  render(){
    return(
      <div className="container">
      <img className="logo" src = {logo}/>
      <div>
        <h1>Welcome to&nbsp;<b>Bloom</b></h1>
      </div>
      <div>
        <h3>Outreach Program</h3>
      </div>
      <div className="buttonRow">
        <Link to = "/register">
          <button className="button">Sign Up</button>
        </Link>
        <Link to="/login">
          <button className="button">Login</button>
        </Link>
      </div>
      <div>
      <p className="information">
          Check out other Bloom BOP leaders, <br/>
        leave feedback for your tutors and students, <br/>
        and grow from feedback others give you!
      </p>
      </div>
      </div>
    );
  }
}

export default Landing;
