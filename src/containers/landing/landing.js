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
      <Link to = "/"><img className="logo" src = {logo}/></Link>
      <div>
        <h1 style={{ fontSize: '48px', marginBottom: '0px'}}>Welcome to&nbsp;<b>Bloom</b></h1>
      </div>
      <div>
        <h3 style={{ fontSize: '36px', marginTop: '0px'}}>Outreach Program</h3>
      </div>
      <div style={{ margin: '30px 0px'}}className="buttonRow">
        <Link to = "/register">
          <button className="button">Sign Up</button>
        </Link>
        <Link to="/login">
          <button className="button">Login</button>
        </Link>
      </div>
      <div>
      <p style={{ fontSize: '24px', textAlign: 'center' }}className="information">
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
