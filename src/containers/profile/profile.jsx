import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import './../../components/profile/profile.css';
import logo from './../../components/landing/logo.png';
import { withRouter } from 'react-router';
import makeRequest from "../../api/makeRequest";
import Navbar from "../../components/nav/Navbar";
import { Nav } from "react-bootstrap";
import { Line, ProfileContainer, ProfileInner, ProfileTitle, ProfileInfo, ProfileInfoTag, ProfileInfoResponse, ProfileComments, AddComments } from '../../components/profile/styles'


export default function Profile() {
    let { userid } = useParams();
    const [user, setUser] = useState({
        username: '',
        image: logo,
        name: '',
        role: '',
        email: '',
        comments: [{from: "RR", to: "JJ", time: "2020-11-05", Content: "Hello, I love your teaching!"},
        {from: "KK", to: "JJ", time: "2020-11-04", Content: "Cool profile picture!"},
        {from: "MM", to: "JJ", time: "2020-11-03", Content: "hey what's up"}]
    });
    // effect for getting user information upon visiting this page
    useEffect(() => {
        makeRequest("GET", `api/users/${userid}`)
        .then(res => {
            if (!!res) {
                console.log("user found!")
                console.log(res);
                setUser({
                    username: res.username,
                    image: logo,
                    name: res.name,
                    role: res.role,
                    email: res.email,
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
    
    let commented = (() => {
      user.comments.push(document.getElementById('comment_post_ID').value);
      console.log(user.comments);
      document.getElementById('comment_post_ID').value = '';
    });
  
    return (
      <ProfileContainer>
        <Navbar userId={userid}/>
        <ProfileInner>
          <ProfileTitle>
            <p>My Profile</p>
          </ProfileTitle>
          <Line />
          <ProfileInfo>
            {/* <div>
              <ProfileInfoTag>Profile Photo</ProfileInfoTag>
              <ProfileInfoResponse>{user.image}</ProfileInfoResponse>
            </div> */}
            <div style={{ width: '100%' }}>
              <ProfileInfoTag>Name</ProfileInfoTag>
              <ProfileInfoResponse>{user.name}</ProfileInfoResponse>
            </div>
            <div>
              <ProfileInfoTag>Username</ProfileInfoTag>
              <ProfileInfoResponse>{user.username}</ProfileInfoResponse>
            </div>
            <div>
              <ProfileInfoTag>Role</ProfileInfoTag>
              <ProfileInfoResponse>{user.role}</ProfileInfoResponse>
            </div>
            <div>
              <ProfileInfoTag>Email</ProfileInfoTag>
              <ProfileInfoResponse>{user.email}</ProfileInfoResponse>
            </div>
          </ProfileInfo>
          <Line />
          <ProfileComments>
            <p>Your Comments</p>
            <table>
              {user.comments && user.comments.map((item => <tr>{item.content}</tr>))}
            </table>
          </ProfileComments>
          <Line />
          <AddComments>
            <label for="comment" class="required">Your message</label>
            <textarea name="comment" id="comment" rows="10" tabindex="4"  required="required"></textarea>
            <input type="hidden" name="comment_post_ID" value="1" id="comment_post_ID" />
            <button name="submit" type="submit" value="Submit comment" onclick="commented();">Submit</button>
          </AddComments>
        </ProfileInner>
      </ProfileContainer>
      );
    }
/*{ 
        <table>
          <tr>
            
          </tr>
        <tr>
          <p class = "username-display">{user.username}</p>
        </tr>
        <tr>
          <img id = "nav-pic" src={user.image}/>
        </tr>
        <tr>
          <p>Role: {user.role}</p>
        </tr>
        {user.comments && user.comments.map((item => <tr>{item.content}</tr>))}
        <tr>
          <br/>
        </tr>
        <tr>
        <label for="comment" class="required">Your message</label>
        </tr>
        <tr>
        <textarea name="comment" id="comment" rows="10" tabindex="4"  required="required"></textarea>
        <input type="hidden" name="comment_post_ID" value="1" id="comment_post_ID" />
        </tr>
        <tr>
        <button name="submit" type="submit" value="Submit comment" onclick="commented();">Submit</button>
        </tr>
      </table>
      </> }
      
    )
    };*/
