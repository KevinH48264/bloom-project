import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import './../../components/profile/profile.css';
import logo from './../../components/landing/logo.png';

import { withRouter } from 'react-router';
import makeRequest from "../../api/makeRequest";



export default function Profile() {
    let { userid } = useParams();
    const [user, setUser] = useState({
        username: '',
        image: logo,
        name: '',
        role: '',
        comments: [{from: "RR", to: "JJ", time: "2020-11-05", Content: "Hello, I love your teaching!"},
        {from: "KK", to: "JJ", time: "2020-11-04", Content: "Cool profile picture!"},
        {from: "MM", to: "JJ", time: "2020-11-03", Content: "hey what's up"}]
    });
    // effect for getting user information upon visiting this page
    useEffect(() => {
        makeRequest("GET", `/api/users/${userid}`)
        .then(res => {
            if (!!res) {
                console.log("user found!")
                console.log(res);
                setUser({
                    username: res.username,
                    image: logo,
                    name: res.name,
                    role: res.role,
                    comments: [{from: "RR", to: "JJ", time: "2020-11-05", Content: "Hello, I love your teaching!"},
                               {from: "KK", to: "JJ", time: "2020-11-04", Content: "Cool profile picture!"},
                               {from: "MM", to: "JJ", time: "2020-11-03", Content: "hey what's up"}]
                });
                console.log(user);
            }
            else {
                console.log("something went wrong getting the user/empty returned");
            }
        })
        .catch(err => {
            console.log("User was not found/does not exist!");
            console.log(err);  
        })
    }, []);
    
  
    return ( 
      <div>
      <div id = "navbar">
        <img id = "nav-pic" src = {logo}/>
        <a class="active" href="#home"><Link to = "/">Home</Link></a>
        <a>Roster</a>
        <a onclick = "signOut();"><Link to = "/login">Sign Out</Link></a>
      </div>
      <div>
        <p>{user.username}</p>
        <img id = "nav-pic" src={user.image}/>
        <p>{user.role}</p>
        <table>
          {user.comments.map((item => <tr>{item.Content}</tr>))}
        </table>
      </div>
      </div>
      
    )
    };