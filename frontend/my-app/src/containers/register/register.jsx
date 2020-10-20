import React, {useState, useEffect} from "react";
import { Redirect, Link } from 'react-router-dom';
import './../../components/register/register.css';
import makeRequest from "../../api/makeRequest";
/*
class Register extends React.Component {
  contructor(props){
    this.setState({
      role: '',
      username: '',
      email : '',
      password : '',
      password_confirm : ''
    })
  }

  handleChange (event) {this.setState({[event.target.name]: event.target.value})};

  handleSubmit (event) {
    /*
    this.setState({role: document.getElementbyId('role').value})
    if(document.getElementById('username').value !== ''){
      this.setState({username: document.getElementById('username').value})
      alert(this.state);
    }
    else {
      alert("Please fill out username field");
    }
    if(document.getElementById('email').value !== ''){
      this.setState({username: document.getElementById('email').value})
    }
    else {
      alert("Please fill out email field");
    }
    if(document.getElementById('password').value !== ''){
    if(document.getElementById('password').value ===
      document.getElementById('password_confirm').value){
        this.setState({username: document.getElementById('email').value})
    }
    else {
      alert("Passwords must be matching");
    }
    }
    else {
      alert("Please fill out password field");
    }
    */
   
    /*
    if (this.state.username === "") {
      alert("Please fill out username field");
    }
    if (this.state.email === "") {
      alert("Please fill out email field");
    }
    if (this.state.password === "") {
      alert("Please fill out password field");
    }
    if (this.state.password !== this.state.password_confirm) {
      alert("Passwords must match");
    }
    // once all of the form components are done, transition to calling backend
    const newCredentials = {
      role: this.state.role,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }

    const testFail = {
      role: "Administrator",
      username: "richardzhu64",
      email: "richardzhu@college.harvard.edu",
      password: "test pw"
    }

    // call backend to check for user
    makeRequest("POST", "/api/users/register", newCredentials)
    .then(res => {
      if (!!res) {
        console.log("successfully registered user");
        console.log(res);
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
      // 404 for when the registration information is incomplete/has problems
      else if (err.response.status === 404) {
        console.log("registration info was faulty");
        console.log(err);
      }
      // other errors
      else {
        console.log("Unknown error trying to register user");
        console.err(err);
      }
    });
  }

  render(){
    return(
      <>
        <div class = "registration">
          <form onSubmit = {this.handleSubmit.bind(this)}>
            <h1>Register</h1>
            <label for="role">Role:</label>
            <select 
              id="role" name="role"
              onChange = {this.handleChange.bind(this)}
            >
              <option value="admin">Administrator</option>
              <option value="tutor">Tutor</option>
              <option value="student">Student</option>
            </select>
            <br/>
            <br/>
            <input type="text"
              onChange = {this.handleChange.bind(this)}
              name = "name"
              id = "name"
              placeholder = "Name"/>
            <br/>
            <br/>
            <input type="email"
              onChange = {this.handleChange.bind(this)}
              name = "email"
              id = "email"
              placeholder = "Email"/>
            <br/>
            <br/>
            <input type="text"
              onChange = {this.handleChange.bind(this)}
              name = "username"
              id = "username"
              placeholder = "Username"/>
            <br/>
            <br/>
            <input type = "password"
              onChange = {this.handleChange.bind(this)}
              name = "password"
              id = "password"
              placeholder = "Password"/>
            <br/>
            <br/>
            <input type = "password"
              onChange = {this.handleChange.bind(this)}
              name = "password_confirm"
              id = "password_confirm"
              placeholder = "Confirm Password"/>
            <br/>
            <br/>
            <button type="submit" value="Register"/>
            <br/>
            <br/>
            <Link to = "/login">
              <button>Redirect to Login Page</button>
            </Link>
          </form>
        </div>
      </>
    );
  }
}
*/

const Register = props => {
    const [values, setValues] = useState({
        role: '',
        username: '',
        email : '',
        password : '',
        password_confirm : ''
      });
  
    const handleChange = (event) => {
      setValues({[event.target.name]: event.target.value})
    };
  
    const handleSubmit = (event) => {
      /*
      this.setState({role: document.getElementbyId('role').value})
      if(document.getElementById('username').value !== ''){
        this.setState({username: document.getElementById('username').value})
        alert(this.state);
      }
      else {
        alert("Please fill out username field");
      }
      if(document.getElementById('email').value !== ''){
        this.setState({username: document.getElementById('email').value})
      }
      else {
        alert("Please fill out email field");
      }
      if(document.getElementById('password').value !== ''){
      if(document.getElementById('password').value ===
        document.getElementById('password_confirm').value){
          this.setState({username: document.getElementById('email').value})
      }
      else {
        alert("Passwords must be matching");
      }
      }
      else {
        alert("Please fill out password field");
      }
      */
     
      /*
      if (this.state.username === "") {
        alert("Please fill out username field");
      }
      if (this.state.email === "") {
        alert("Please fill out email field");
      }
      if (this.state.password === "") {
        alert("Please fill out password field");
      }
      if (this.state.password !== this.state.password_confirm) {
        alert("Passwords must match");
      }
      */
      // once all of the form components are done, transition to calling backend
      const newCredentials = {
        role: this.state.role,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }
  
      const testFail = {
        role: "Administrator",
        username: "richardzhu64",
        email: "richardzhu@college.harvard.edu",
        password: "test pw"
      }
  
      // call backend to check for user
      makeRequest("POST", "/api/users/register", newCredentials)
      .then(res => {
        if (!!res) {
          console.log("successfully registered user");
          console.log(res);
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
        // 404 for when the registration information is incomplete/has problems
        else if (err.response.status === 404) {
          console.log("registration info was faulty");
          console.log(err);
        }
        // other errors
        else {
          console.log("Unknown error trying to register user");
          console.err(err);
        }
      });
    }
      return(
        <>
          <div class = "registration">
            <form onSubmit = {this.handleSubmit.bind(this)}>
              <h1>Register</h1>
              <label for="role">Role:</label>
              <select 
                id="role" name="role"
                onChange = {this.handleChange.bind(this)}
              >
                <option value="admin">Administrator</option>
                <option value="tutor">Tutor</option>
                <option value="student">Student</option>
              </select>
              <br/>
              <br/>
              <input type="text"
                onChange = {this.handleChange.bind(this)}
                name = "name"
                id = "name"
                placeholder = "Name"/>
              <br/>
              <br/>
              <input type="email"
                onChange = {this.handleChange.bind(this)}
                name = "email"
                id = "email"
                placeholder = "Email"/>
              <br/>
              <br/>
              <input type="text"
                onChange = {this.handleChange.bind(this)}
                name = "username"
                id = "username"
                placeholder = "Username"/>
              <br/>
              <br/>
              <input type = "password"
                onChange = {this.handleChange.bind(this)}
                name = "password"
                id = "password"
                placeholder = "Password"/>
              <br/>
              <br/>
              <input type = "password"
                onChange = {this.handleChange.bind(this)}
                name = "password_confirm"
                id = "password_confirm"
                placeholder = "Confirm Password"/>
              <br/>
              <br/>
              <button type="submit" value="Register"/>
              <br/>
              <br/>
              <Link to = "/login">
                <button>Redirect to Login Page</button>
              </Link>
            </form>
          </div>
        </>
      );
}
export default Register;
