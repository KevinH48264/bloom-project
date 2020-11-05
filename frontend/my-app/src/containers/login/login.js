import React from "react";
import { Link } from 'react-router-dom';
import makeRequest from "../../api/makeRequest";
import { withRouter } from 'react-router';
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
    makeRequest("POST", "/api/users/login", credentials)
    .then(res => {
      console.log(res.user)
      if (!!res.login && res.login == true) {
        console.log("successfully logged in user")
        console.log(res.id);

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
      <div className = "login">
      <form onSubmit = {this.handleSubmit.bind(this)}>
        <h1>Login</h1>
        <input type="text"
        name = "usernameOrEmail"
        onChange = {this.handleChange.bind(this)}
        placeholder = "Username or Email"/>
        <br/>
        <input type = "text"
        name = "password"
        onChange = {this.handleChange.bind(this)}
        placeholder = "Password"/>
        <br/>
        <input type="submit" value="Submit" />
        <br/>
        <br/>
        <Link to = "/register">
          <button>Register Page</button>
        </Link>
      </form>
      </div>
      </>
    );
  }
}

export default withRouter(Login);
