import React, { useState, useEffect } from "react";
import "./roster.css";
import { Redirect, Link, useParams } from 'react-router-dom';
import makeRequest from "../../api/makeRequest";
import { useHistory } from "react-router";
import profile from "../profile/profile.png";
import Navbar from "../../components/nav/Navbar";


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
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%'}}>
            <Navbar userId={userId}/>
            
            <h1>All Bloom Users</h1>
            <br/>
            <div id="users-table" style={{backgroundColor: "white"}}>
                <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th></th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Comments</th>
                    </tr>
                </thead>
                <tbody>
                {allUsers.map(user => {
                    return(
                    <tr key={user._id} onClick={() => {
                        console.log("clicked row");
                        // redirect to personal page
                        history.push(`/profile/${user._id}`)
                    }}>
                        <td>{user.name}</td>
                        <td>{user.role}</td>
                        <td><img style={{flex: 1, width: null, height: null, resizeMode: 'contain'}} src={profile}></img></td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        {user.comments.length !== 0 && user.comments && (
                            user.comments.map((item => <tr>{item.content}</tr>))
                        )}
                        {user.comments.length == 0 && (
                            <td>{"This is where user comments would go!"}</td>
                        )}
                    </tr>
                    )
                })}
                </tbody>
                </table>
            </div>
        </div>
    );
}