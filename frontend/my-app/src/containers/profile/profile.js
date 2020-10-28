import React from "react";
import { Link } from 'react-router-dom';
import './../../components/profile/profile.css';
import logo from './../../components/landing/logo.png';

class Profile extends React.Component {
  contructor(props){
    this.state = {
      username: 'test',
      image: logo,
      name: 'test test',
      role: 'tester'
    };
  }

  signOut = function(){
    this.setState({username: '', image: logo, name: '', role: ''});
  }

  render(){
    return(
      <>
      <div id = "navbar">
        <img id = "nav-pic" src = {logo}/>
        <a class="active" href="#home"><Link to = "/">Home</Link></a>
        <a>Roster</a>
        <a onclick = "signOut();"><Link to = "/login">Sign Out</Link></a>
      </div>
      <table>
        </table>
      </>
    );
  }
}

export default Profile;
