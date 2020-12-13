import React, { useState, useEffect } from "react";
import "./roster.css";
import { Redirect, Link, useParams } from 'react-router-dom';
import makeRequest from "../../api/makeRequest";
import { useHistory } from "react-router";
import profile from "../profile/profile.png";
import Navbar from "../../components/nav/Navbar";
import { Line, ProfileContainer, ProfileInner, ProfileTitle } from '../../components/profile/styles'
import { UserTable, Left } from '../../components/roster/styles'

function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};

export default function Roster() {

    const history = useHistory();
    let { userId } = useParams();

    // create state for all users
    const [allUsers, setAllUsers] = useState([]);

    // call endpoint for finding all users, set state as this value
    useEffect(() => {
        makeRequest("POST", "api/users/findUsers")
        .then(res => {
            if (!res) {
                console.log("users returned nothing");
            }
            setAllUsers(res);
        }).catch(err => console.log(err));
    }, []);

    
    return (
        <ProfileContainer>
            <Navbar userId={userId}/>
            <ProfileInner>
            <ProfileTitle>
                <p>All Bloom Users</p>
            </ProfileTitle>
            <Line />
            <UserTable>
                <table>
                <thead style={{ border: 'none' }}>
                    <tr>
                        <Left style={{ fontWeight: 'bold' }}>Name</Left>
                        <Left style={{ fontWeight: 'bold' }}>Role</Left>
                        <Left style={{ fontWeight: 'bold' }}>Email</Left>
                        <th style={{ border: 'none' }}>Comments</th>
                    </tr>
                 </thead>
                 <tbody>
                 {allUsers.map(user => {
                    var base64Flag = 'data:image/jpeg;base64,';
                    // var imageStr = arrayBufferToBase64(user.img.data.data);

                    return(
                    <tr key={user._id} onClick={() => {
                        console.log("clicked row");
                        // redirect to personal page
                        history.push(`/profile/${user._id}`)
                    }}>
                        
                        {/* <td><img src={base64Flag + imageStr} /></td> */}
                        <Left>{user.name}</Left>
                        <Left>{user.role}</Left>
                        <Left>{user.email}</Left>
                        {/* <td>{user.email}</td> */}
                        {user.comments.length !== 0 && user.comments && (
                            user.comments.map((item => <tr style={{ border: 'none' }}>{item.content}</tr>))
                        )}
                        {user.comments.length == 0 && (
                            <td style={{ border: 'none' }}>{"This is where user comments would go!"}</td>
                        )}
                    </tr>
                    )
                })}
                </tbody>
                </table>
            </UserTable>
            </ProfileInner>
        </ProfileContainer>
    );
}