import React from "react";
import { Link, useParams } from 'react-router-dom';
import { withRouter } from 'react-router';
import logo from './../landing/logo.png';

export default function Navbar(props) {

    return (
        <div id = "navbar">
        <img id = "nav-pic" src = {logo}/>
        <a class="active" href="#home"><Link to ="/">Home</Link></a>
        <a><Link to="/roster">Roster</Link></a>
        <a onclick = "signOut();"><Link to = "/login">Sign Out</Link></a>
      </div>
    )
}