import React, { Component } from "react";
import LoginPage from "./LoginPage";
import '../App.css';
import Register from './Register';

class DefaultPage extends Component {
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