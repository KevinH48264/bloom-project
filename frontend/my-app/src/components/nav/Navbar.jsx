import React, {useState, useEffect} from "react";
import { Link, useParams } from 'react-router-dom';
import { withRouter } from 'react-router';
import logo from './../landing/logo.png';

export default function Navbar(props) {
    const [user, setUser] = useState((localStorage.getItem("userId")) || props.userId);
    console.log(user);
    return (
        <div id = "navbar">
        <img id = "nav-pic" src = {logo}/>
        <a class="active" href="#home"><Link to ={`/profile/${user}`}>Home</Link></a>
        <a><Link to={`/roster`}>Roster</Link></a>
        <a onclick = "signOut();"><Link to = "/login">Sign Out</Link></a>
      </div>
    )
}