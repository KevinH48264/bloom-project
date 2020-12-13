import React, { useState, useEffect, useCallback } from "react";
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
        comments: [],
        id: ''
    });
    // effect for getting user information upon visiting this page
    useEffect(() => {
        makeRequest("GET", `api/users/${userid}`)
        .then(res => {
            if (!!res) {
                console.log("user found!")
                var base64Flag = 'data:image/jpeg;base64,';
                var imageStr = arrayBufferToBase64(res.img.data.data);
                setUser({
                    username: res.username,
                    image: base64Flag + imageStr,
                    name: res.name,
                    role: res.role,
                    email: res.email,
                    comments: res.comments,
                    id : res._id
                });
                reloadComments();
            }
            else {
                console.log("something went wrong getting the user/empty returned");
            }
            console.log(user);
        })
        .catch(err => {
            console.log("User was not found/does not exist!");
            console.log(err);  
        })
    }, [userid]);

    const reloadComments = () => {
        makeRequest("GET", `api/users/${userid}`)
        .then(res => {
            if (!!res) {
                console.log("user found!")
                var base64Flag = 'data:image/jpeg;base64,';
                var imageStr = arrayBufferToBase64(res.img.data.data);
                setUser({
                    username: res.username,
                    image: base64Flag + imageStr,
                    name: res.name,
                    role: res.role,
                    email: res.email,
                    comments: res.comments,
                    id : res._id
                });
            }
            else {
                console.log("something went wrong getting the user/empty returned");
            }
            console.log(user);
        })
        .catch(err => {
            console.log("User was not found/does not exist!");
            console.log(err);  
        })
      };

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
      console.log('test')
      var dateObj = new Date();
      var month = dateObj.getUTCMonth() + 1; //months from 1-12
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
      var loggedInUser = ""

      var newdate = year + "-" + month + "-" + day;
      // makeRequest("GET", `api/users/${localStorage.userId}`)
      //   .then(res => {
      //       if (!!res) {
      //         loggedInUser = res.name;
      //       }
      //       else {
      //           console.log("something went wrong getting the user/empty returned");
      //       }
      //       console.log(user);
      //   })
      //   .catch(err => {
      //       console.log("User was not found/does not exist!");
      //       console.log(err);  
      //   });
      const comment = 
      {
        "from": userid,
        "fromName": loggedInUser,
        "to": user.id,
        "time": newdate,
        "content": document.getElementById('userInput').value
      };
      makeRequest("POST", `api/users/addComment`, comment);
      console.log(user.comments);
      reloadComments();
      reloadComments();
      // user.comments.push(comment);
      console.log(user.comments);
    }

    const deleteComment = (commentID) => {
      console.log(user.comments);
      console.log(commentID);
      const commentDeleted = 
      {
        "to" : user.id,
        "commentId": commentID
      }
      makeRequest("POST", `api/users/deleteComment`, commentDeleted);
      console.log(user.comments);
      reloadComments();
      reloadComments();
      console.log(user.comments);
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
              <tr>
                <th>Commenter</th>
                <th>Comment</th>
                <th>Date</th></tr>
              {user.comments && user.comments.map((item => 
              <tr>
                <td>{item.fromName}</td>
                <td>{item.content}</td>
                <td>{item.time.substring(0, 10)}</td>
                <td><Button style = {{background: 'red'}} onClick = {() => {
                  deleteComment(item._id);
                  // deleteComment(item._id);
                  }}>Delete</Button></td></tr>))}
            </table>
          </ProfileComments>
          <Line />
          <AddComments>
            <label for="comment" class="required">Leave feedback for: {user.name}!</label>
            <form id="form" action = "#" onSubmit="return false;">
              <input type="text" id="userInput"/>
              <input type="submit" onClick={e => commented()}></input>
            </form>
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
      <h1>Profile Picture Upload</h1>
      <form onSubmit={submitPicture}>
            <div className="form-group">
                <input type="file" onChange={onChangeHandler} />
            </div>
            <div className="form-group">
                <button className="btn btn-primary" type="submit">Upload</button>
            </div>
      </form>
      </>
      
    )
    };*/
