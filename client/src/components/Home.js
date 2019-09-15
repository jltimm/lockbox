import React, { Component } from "react";
import '../App.css';
import { authenticationService } from '../services/authentication-service';

/**
 * Default page at /login
 * Displays the login page and the register page
 */
class Home extends Component {
  constructor(props) {
    super(props);
    if (authenticationService.currentUserValue) { 
      this.props.history.push('/logins')
    }
  }
  render() {
    return (
      <div class='jumbotron'>
          <h1>Lockbox</h1>
      </div>
    )
  }
}

export default Home;