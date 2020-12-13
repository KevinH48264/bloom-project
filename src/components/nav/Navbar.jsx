import React, {useState, useEffect} from "react";
import { Link, useParams } from 'react-router-dom';
import { withRouter } from 'react-router';
import logo from '../landing/logo.png';
import { NavbarContainer, NavInner, NavbarLink } from './styles';

export default function Navbar(props) {
    const [user, setUser] = useState((localStorage.getItem("userId")) || props.userId);
    console.log(user);

    const refreshPage = () => {
      window.location.reload(); 
    }
        

    return (
        <NavbarContainer>
          <NavInner>
            <img id = "nav-pic" src = {logo}/>
            {/* <button type="button" onClick={(e) => refreshPage() }> <span>Reload</span> </button>  */}
            <NavbarLink to ={`/profile/${user}`} refresh="true">My Profile</NavbarLink>
            <NavbarLink to={`/roster`}>View All Members</NavbarLink>
            <a onclick = "signOut();"><NavbarLink to = "/">Sign Out</NavbarLink></a>
          </NavInner>
      </NavbarContainer>
    )
}