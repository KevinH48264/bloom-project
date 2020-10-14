import React from "react";
import { Redirect, Link } from 'react-router-dom';
import './../../components/register/register.css';

class Register extends React.Component {
  contructor(props){
    this.state = {
      role: '',
      username: '',
      email : '',
      password : ''
    }
  }

  handleSubmit (event) {
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
  }

  render(){
    console.log(this.state);
    return(
      <>
        <div class = "registration">
          <form onSubmit = {this.handleSubmit.bind(this)}>
            <h1>Register</h1>
            <label for="role">Role:</label>
            <select id="role" name="role">
              <option value="admin">Administrator</option>
              <option value="tutor">Tutor</option>
              <option value="student">Student</option>
            </select>
            <br/>
            <br/>
            <input type="email"
            name = "email"
            id = "email"
            placeholder = "Email"/>
            <br/>
            <br/>
            <input type="text"
            name = "username"
            id = "username"
            placeholder = "Username"/>
            <br/>
            <br/>
            <input type = "password"
            name = "password"
            id = "password"
            placeholder = "Password"/>
            <br/>
            <br/>
            <input type = "password"
            name = "password_confirm"
            id = "password_confirm"
            placeholder = "Confirm Password"/>
            <br/>
            <br/>
            <input type="submit" value="Register" />
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

export default Register;
