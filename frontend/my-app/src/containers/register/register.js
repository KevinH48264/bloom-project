import React from "react";
import { Link } from 'react-router-dom';
import './../../components/register/register.css';

class Register extends React.Component {
  contructor(props){
    this.state = {
      email : '',
      password : '',
    }
  }

  handleChange (event) {this.setState({[event.target.name]: event.target.value})};
  handleSubmit (event) {
    console.log(event);
  }

  render(){
    return(
      <>
        <div class = "registration">
          <form onSubmit = {this.handleSubmit.bind(this)}>
            <h1>Register</h1>
            <input type="text"
            name = "email"
            onChange = {this.handleChange.bind(this)}
            placeholder = "Email"/>
            <br/>
            <input type = "text"
            name = "password"
            onChange = {this.handleChange.bind(this)}
            placeholder = "Password"/>
            <br/>
            <input type="submit" value="Submit" />
            <br/>
            <br/>
            <Link to = "/login">
              <button>Login Page</button>
            </Link>
          </form>
        </div>
      </>
    );
  }
}

export default Register;
