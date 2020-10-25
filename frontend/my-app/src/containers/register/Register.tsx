import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { RegistrationFormValidator } from "./RegistrationFormValidator";
import { Redirect, Link } from 'react-router-dom';
import './../../components/register/register.css';
import makeRequest from "../../api/makeRequest";
import * as Yup from "yup";
import { useHistory } from "react-router";

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
                        <div className="form-group">
                        <label htmlFor="role" style={{ display: 'block' }}>Role</label>
                        <select
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
                        <div className="form-group">
                            <Field name="name" placeholder="Name" type="text" />
                        </div>
                        <ErrorMessage name="name" component="div" />
                        <div className="form-group">
                            <Field name="username" placeholder="Username" type="text" />
                        </div>
                        <ErrorMessage name="username" component="div"/>
                        <div className="form-group">
                            <Field name="email" placeholder="Email" type="text" />
                            <ErrorMessage name="email" component="div"/>
                        </div>
                        <div className="form-group">
                            <Field name="password" placeholder="Password" type="password" />
                            <ErrorMessage name="password" component="div"/>
                        </div>
                        
                        <div className="form-group">
                            <Field name="confirmPassword" type="password" placeholder="Confirm Password"/>
                            <ErrorMessage name="confirmPassword" component="div" />
                        </div>
                        <div>
                            <button type="submit">Register</button>
                        </div>
                    </Form>
                )}
            </Formik>
            <div>
                <Link to = "/login">
                <button>Redirect to Login Page</button>
                </Link>
            </div>
        </div>
        </>
    );
}
