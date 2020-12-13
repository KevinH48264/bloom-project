import React, {useState, useEffect} from "react";
import { Link, useParams } from 'react-router-dom';
import { withRouter } from 'react-router';
import logo from '../landing/logo.png';
import { NavbarContainer, NavInner, NavbarLink } from './styles';

export default function Navbar(props) {
    const [user, setUser] = useState((localStorage.getItem("userId")) || props.userId);
    console.log(user);
    return (
        <NavbarContainer>
          <NavInner>
            <img id = "nav-pic" src = {logo}/>
            <a class="active" href="#home"><NavbarLink to ={`/profile/${user}`}>My Profile</NavbarLink></a>
            <a><NavbarLink to={`/roster`}>View All Members</NavbarLink></a>
            <a onclick = "signOut();"><NavbarLink to = "/login">Sign Out</NavbarLink></a>
          </NavInner>
      </NavbarContainer>
    )
}