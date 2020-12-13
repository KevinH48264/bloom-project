import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import './../../components/profile/profile.css';
import logo from './../../components/landing/logo.png';
import { withRouter } from 'react-router';
import axios from "axios";
import makeRequest from "../../api/makeRequest";
import Navbar from "../../components/nav/Navbar";
import { Nav } from "react-bootstrap";
import { Button, ProfileInfoRow, Line, ProfileContainer, ProfileInner, ProfileTitle, ProfileInfo, ProfileInfoTag, ProfileInfoResponse, ProfileComments, AddComments } from '../../components/profile/styles'

function arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => binary += String.fromCharCode(b));
  return window.btoa(binary);
};

export default function Profile() {
    let { userid } = useParams();
    const [user, setUser] = useState({
        username: '',
        image: '',
        name: '',
        role: '',
        email: '',
        comments: [{from: "RR", to: "JJ", time: "2020-11-05", Content: "Hello, I love your teaching!"},
        {from: "KK", to: "JJ", time: "2020-11-04", Content: "Cool profile picture!"},
        {from: "MM", to: "JJ", time: "2020-11-03", Content: "hey what's up"}]
    });
    // effect for getting user information upon visiting this page
    useEffect(() => {
        console.log('using effect');
        makeRequest("GET", `api/users/${userid}`)
        .then(res => {
            if (!!res) {
                console.log("user found!")
                console.log(res);
                var base64Flag = 'data:image/jpeg;base64,';
                var imageStr = arrayBufferToBase64(res.img.data.data);
                setUser({
                    username: res.username,
                    image: base64Flag + imageStr,
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
    }, [userid]);

    const onChangeHandler=(event)=>{
      var currentFile = event.target.files[0]
      setUser(prevState => {
        return { ...prevState, updatedImage: currentFile}
      })
    }

    const submitPicture = (event) => {
      console.log(user)
      const formData = new FormData()
      formData.append('image', user.updatedImage)
      axios.post(`https://bloom-website.herokuapp.com/api/users/updatePicture/${userid}`, formData, {
      }).then(res => {
          console.log(res)
      })
    }
    
    const commented = (event) => {
      console.log(user.comments);
      user.comments.push(document.getElementById('comment_post_ID').value);
      console.log(user.comments);
      document.getElementById('comment_post_ID').value = '';
    }
  
    return (
      <ProfileContainer>
        <Navbar userId={userid}/>
        <ProfileInner>
          <ProfileTitle>
            <p>My Profile</p>
          </ProfileTitle>
          <Line />
          <ProfileInfo>
            <ProfileInfoRow>
              <ProfileInfoTag>Profile Picture</ProfileInfoTag>
              <ProfileInfoResponse style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <img style={{ width: '200px', marginBottom: '20px'}} id = "nav-pic" src={user.image}/>
                <form style={{ width: '200px', display: 'flex', flexDirection: 'column' }} onSubmit={submitPicture}>
                  <div style={{ width: '150px'}} className="form-group">
                      <input type="file" style={{ width: '200px'}} onChange={onChangeHandler} />
                  </div>
                  <div style={{ width: '200px', flexDirection: 'row', justifyContent: 'flex-start' }} className="form-group">
                      <Button style={{ margin: '0px' }} className="btn btn-primary" type="submit">Upload</Button>
                  </div>
                </form>
              </ProfileInfoResponse>
            </ProfileInfoRow>            
            <ProfileInfoRow>
              <ProfileInfoTag>Name</ProfileInfoTag>
              <ProfileInfoResponse>{user.name}</ProfileInfoResponse>
            </ProfileInfoRow>
            <ProfileInfoRow>
              <ProfileInfoTag>Username</ProfileInfoTag>
              <ProfileInfoResponse>{user.username}</ProfileInfoResponse>
            </ProfileInfoRow>
            <ProfileInfoRow>
              <ProfileInfoTag>Role</ProfileInfoTag>
              <ProfileInfoResponse>{user.role}</ProfileInfoResponse>
            </ProfileInfoRow>
            <ProfileInfoRow>
              <ProfileInfoTag>Email</ProfileInfoTag>
              <ProfileInfoResponse>{user.email}</ProfileInfoResponse>
            </ProfileInfoRow>
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
            <label style={{ marginBottom: '50px' }}for="comment" class="required">Leave feedback for: {user.name}!</label>
            <textarea style={{ marginBottom: '25px' }} name="comment" id="comment" rows="10" tabindex="4"  required="required"></textarea>
            <input  type="hidden" name="comment_post_ID" value="1" id="comment_post_ID" />
            <Button name="submit" type="submit" value="Submit comment" onClick={e => commented()}>Submit</Button>
          </AddComments>
        </ProfileInner>
      </ProfileContainer>
      );
    }
