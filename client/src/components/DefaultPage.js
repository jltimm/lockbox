import React, { Component } from "react";
import LoginPage from "./LoginPage";
import '../App.css';
import Register from './Register';
import { authenticationService } from '../services/authentication-service';

class DefaultPage extends Component {
  constructor(props) {
    super(props);
    if (authenticationService.currentUserValue) { 
      this.props.history.push('/logins')
    }
  }
  render() {
    return (
      <div class='wrapper'>
        <div class='left'>
          <LoginPage />
        </div>
        <div class='right'>
          <Register />
        </div>
      </div>
    )
  }
}

export default DefaultPage;