import React from "react";
import { Link } from 'react-router-dom';
import './../../components/login/login.css';
import makeRequest from "../../api/makeRequest";
import { withRouter } from 'react-router';
import logo from './../../components/landing/logo.png';

class Login extends React.Component {
  contructor(props){
    this.state = {
      usernameOrEmail : '',
      password : '',
    }
  }

  handleChange (event) {this.setState({[event.target.name]: event.target.value})};
  handleSubmit (event) {
    event.preventDefault();
    console.log(event);
    const credentials = this.state;
    // call backend to check for user
    makeRequest("POST", "api/users/login", credentials)
    .then(res => {
      console.log(res.user)
      if (!!res.login && res.login == true) {
        console.log("successfully logged in user")
        console.log(res.id);
        localStorage.setItem("userId", res.id);
        this.props.history.push(`/profile/${res.id}`)
        // this.props.history.push(
        //   pathname: '/profile',
        //   state: { userdata: res.user }
        // })
      }
      else {
        console.log("user not found");
      }
    })
    .catch(err => {
      console.log("Error trying to login user");
      console.log(err);
    });
}

  render(){
    return(
      <>
      <div className="container">
        <Link to = "/"><img className="logo" src = {logo}/></Link>
        <div>
        <div className="form-container">
          <form onSubmit = {this.handleSubmit.bind(this)}>
            <h1 className="title" ><b>Log In</b></h1>
            <div className="formGroup">
              <label className="formLabel" htmlFor="usernameOrEmail">Username or Email</label>
              <input className="formInput" type="text"
                name = "usernameOrEmail"
                onChange = {this.handleChange.bind(this)}
                placeholder = "Username or Email"/>            
            </div>
            <div className="formGroup">
              <label className="formLabel" htmlFor="password">Password</label>
              <input className="formInput" type = "text"
                name = "password"
                type="password"
                onChange = {this.handleChange.bind(this)}
                placeholder = "Password"/>
            </div>
            <div><input className = "button submit" type="submit" value="Log In" /></div>
            <div>
              <p>Don't have a BOP Account?  <Link to = "/register">Register Here</Link></p>
            </div>
          </form>
        </div>
        </div>
      </div>
      </>
    );
  }
}

export default withRouter(Login);