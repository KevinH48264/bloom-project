import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import "./roster.css";
import { Redirect, Link } from 'react-router-dom';
import './../../components/register/register.css';
import makeRequest from "../../api/makeRequest";
import * as Yup from "yup";
import { useHistory } from "react-router";

export default function Roster() {

    const history = useHistory();

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
        <>
        <h1>All Bloom Users</h1>
        <br/>
        <br/>
        <div id="users-table">
            <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Role</th>
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
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    {user.comments.length !== 0 && (
                        <td>{user.comments[0]}</td>
                    )}
                </tr>
                )
            })}
            </tbody>
            </table>
        </div>
        </>
    );
}