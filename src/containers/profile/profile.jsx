import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from 'react-router-dom';
import './../../components/profile/profile.css';
import logo from './../../components/landing/logo.png';
import profile_pic from './../../components/landing/profile_pic.jpg';
import { withRouter } from 'react-router';
import axios from "axios";
import makeRequest from "../../api/makeRequest";
import Navbar from "../../components/nav/Navbar";
import { Nav } from "react-bootstrap";
import { Comment, CommentTable, Button, ProfileInfoRow, Line, ProfileContainer, ProfileInner, ProfileTitle, ProfileInfo, ProfileInfoTag, ProfileInfoResponse, ProfileComments, AddComments } from '../../components/profile/styles'

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
            if (res) {
                console.log("user found!")
                var base64Flag = '';
                var imageStr = '';
                console.log(res.img)
                if (res.img) {
                    var base64Flag = 'data:image/jpeg;base64,';
                    var imageStr = arrayBufferToBase64(res.img.data.data);
                }
                // } else {
                //     var imageAsBase64 = fs.readFileSync('./profile.png', {encoding: 'base64'});
                //     var imageStr = imageAsBase64;
                // }
                
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
                var base64Flag = '';
                var imageStr = '';
                console.log(res.img)
                if (res.img) {
                    var base64Flag = 'data:image/jpeg;base64,';
                    var imageStr = arrayBufferToBase64(res.img.data.data);
                }
                // } else {
                //     var imageAsBase64 = fs.readFileSync('./profile.png', {encoding: 'base64'});
                //     var imageStr = imageAsBase64;
                // }
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
      var dateObj = new Date();
      var month = dateObj.getUTCMonth() + 1; //months from 1-12
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
      var loggedInUser = ""

      var newdate = year + "-" + month + "-" + day;
      const comment = 
      {
        "from": userid,
        "fromName": loggedInUser,
        "to": user.id,
        "time": newdate,
        "content": document.getElementById('userInput').value
      };
      makeRequest("POST", `api/users/addComment`, comment);
      reloadComments();
      reloadComments();
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
          { localStorage.userId == userid 
          ? <p>My Profile</p>
          : <p>{user.name}</p>}
          </ProfileTitle>
          <Line />
          <ProfileInfo>
            <ProfileInfoRow>
              <ProfileInfoTag>Profile Picture</ProfileInfoTag>
              <ProfileInfoResponse style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <img style={{ width: '200px', marginBottom: '20px'}} id = "nav-pic" src={user.image || profile_pic}/>
                { localStorage.userId == userid 
                  ? <form style={{ width: '200px', display: 'flex', flexDirection: 'column' }} onSubmit={submitPicture}>
                  <div style={{ width: '150px'}} className="form-group">
                      <input type="file" style={{ width: '200px'}} onChange={onChangeHandler} />
                  </div>
                  <div style={{ width: '200px', flexDirection: 'row', justifyContent: 'flex-start' }} className="form-group">
                      <Button style={{ margin: '0px' }} className="btn btn-primary" type="submit">Upload</Button>
                  </div>
                </form>
              : <div />
              }
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
          { localStorage.userId == userid 
          ? <ProfileComments>
            <p style={{ marginBottom: '50px' }}>Your Comments</p>
            <CommentTable>
              <tr style={{ fontWeight: 'bold' }}>
                <Comment>Commenter</Comment>
                <Comment style= {{ width: '500px'}}>Comment</Comment>
                <Comment>Date</Comment>
                <Comment></Comment></tr>
              {user.comments && user.comments.map((item => 
              <tr>
                <Comment>{item.fromName}</Comment>
                <Comment style= {{ width: '500px'}}>{item.content}</Comment>
                <Comment>{item.time.substring(0, 10)}</Comment>
                <Button style = {{background: 'red', margin: '20px 25px'}} onClick = {() => {
                  deleteComment(item._id);
                  // deleteComment(item._id);
                  }}>Delete</Button></tr>))}
            </CommentTable>
          </ProfileComments>
          
          : <div />}
          { localStorage.userId == userid 
          ? <Line />
          : <div />}
          <AddComments>
            <label style={{ marginBottom: '50px' }} for="comment" class="required">Leave feedback for: {user.name}!</label>
            <form style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }} id="form" action = "#" onSubmit="return false;">
              <textarea style={{ padding: '20px' , marginBottom: '25px' }} name="comment" id="userInput" rows="10" tabindex="4"  required="required"></textarea>
              <Button style = {{ justifyContent: "center"}} name="submit" type="submit" value="Submit comment" onClick={e => commented()}>Submit</Button>
            </form>          
          </AddComments>
        </ProfileInner>
      </ProfileContainer>
      );
    }
