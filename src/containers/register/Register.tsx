import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { RegistrationFormValidator } from "./RegistrationFormValidator";
import { Redirect, Link } from 'react-router-dom';
import './../../components/register/register.css';
import makeRequest from "../../api/makeRequest";
import * as Yup from "yup";
import { useHistory } from "react-router";
import logo from './../../components/landing/logo.png';


interface RegisterFormValues {
    role: string,
    name: string,
    username: string,
    email : string,
    password : string,
    confirmPassword : string
}

export default function RegisterForm() {
    const history = useHistory();

    const submitRegister = (values: RegisterFormValues) => {
        console.log("called submitRegister!");
        console.log(values);
        if (values.confirmPassword === values.password) {
            const newCredentials = {
                role: values.role,
                name: values.name,
                username: values.username,
                email: values.email,
                password: values.password
            }
            console.log(newCredentials)
        // call backend to check for user
        makeRequest("POST", "/api/users/register", newCredentials)
        .then(res => {
            if (!!res) {
                console.log("successfully registered user");
                console.log(res);
                history.push(`/login`);
            }
            else {
                console.log('user not created, unknown issue');
            }
        })
        .catch(err => {
            // 303 for case where user already exists
            if (err.response.status === 303) {
                console.log("user already exists");
                console.log(err);
            }
            // 400 for when the registration information is incomplete/has problems
            else if (err.response.status === 400) {
                console.log("registration info was faulty");
                console.log(err);
            }
            // other errors
            else {
                console.log("Unknown error trying to register user");
                console.log(err);
            }
        });
            }
            else {
                alert("Passwords must match!");
            }
    };

    return (
        <>
        <div className="container">
        <img className="logo" src = {logo}/>
        <h1 className="title">Sign Up</h1>
        <div>
            <Formik
                initialValues={{
                    role: '',
                    name: '',
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                }}
                //validate={RegistrationFormValidator.createValidator()}
                validationSchema={Yup.object().shape({
                    role: Yup.string().required("Please select a role"),
                    name: Yup.string().required('Name is required'),
                    username: Yup.string()
                        .required('Username is required'),
                    email: Yup.string()
                        .email('Email is invalid')
                        .required('Email is required'),
                    password: Yup.string()
                        .min(6, 'Password must be at least 6 characters')
                        .required('Password is required'),
                    confirmPassword:  Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Passwords must match')
                        .required('Confirm Password is required')
                })}
                validateOnBlur={true}
                validateOnChange={false}
                onSubmit={submitRegister}
            >
            {({values, handleChange, handleBlur}) => (
                    <Form>
                        <div className="form-container">
                        <div className="formGroup">
                        <label className="formLabel" htmlFor="role">Role</label>
                        <select
                            className="formInput"
                            id="role"
                            name="role"
                            value={values.role}
                            defaultValue="default"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{ display: 'block' }}
                        >
                            <option value="">Select a Role</option>
                            <option value="admin">Administrator</option>
                            <option value="tutor">Tutor</option>
                            <option value="student">Student</option>
                        </select>
                        </div>
                        <div className="formGroup">
                            <label className="formLabel" htmlFor="name">Name</label>
                            <Field className="formInput" name="name" placeholder="Enter your name" type="text" />
                        </div>
                        <ErrorMessage className="formError" name="name" component="div" />
                        <div className="formGroup">
                            <label className="formLabel" htmlFor="username">Username</label>
                            <Field className="formInput" name="username" placeholder="Enter your username" type="text" />
                        </div>
                        <ErrorMessage className="formError" name="username" component="div"/>
                        <div className="formGroup">
                            <label className="formLabel" htmlFor="email">Email</label>
                            <Field className="formInput" name="email" placeholder="Enter your email" type="text" />
                        </div>
                        <ErrorMessage className="formError" name="email" component="div"/>
                        <div className="formGroup">
                            <label className="formLabel" htmlFor="password">Password</label>
                            <Field className="formInput" name="password" placeholder="Enter your password" type="password" />
                        </div>
                        <ErrorMessage className="formError" name="password" component="div"/>
                        <div className="formGroup">
                            <label className="formLabel" htmlFor="password">Confirm Password</label>
                            <Field className="formInput" name="confirmPassword" type="password" placeholder="Re-enter your password"/>
                        </div>
                        <ErrorMessage className="formError" name="confirmPassword" component="div" />
                        <div>
                            <button className = "button submit" type="submit">Register</button>
                        </div>
                        <div>
                            <p>
                                Already have a BOP Account?  <Link to = "/login">Log In</Link>
                            </p>
                        </div>
                        </div>
                    </Form>
         
         )}
            </Formik>
        </div>
        </div>
        </>
    );
}
