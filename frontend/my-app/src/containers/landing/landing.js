import React from "react";
import { Link } from 'react-router-dom';
import './../../components/landing/landing.css';

export class Landing extends React.Component {
  contructor(props){
    this.state = {};
  }

  render(){
    return(
      <>
        <div class = "button-wrapper">
        <table>
        <tr>
        <h1>Welcome!</h1>
        </tr>
        <tr>
          <Link to = "/register">
            <button>Sign Up</button>
          </Link>
          </tr>
          </table>
        </div>
      </>
    );
  }
}
