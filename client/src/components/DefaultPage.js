import React, { useEffect } from "react";
import LoginPage from "./LoginPage";
import '../App.css';
import Register from './Register';
import { useHistory } from 'react-router-dom';
import { authenticationService } from '../services/authentication-service';

/**
 * Default page at /login
 * Displays the login page and the register page
 */
function DefaultPage() {

  let history = useHistory();

  useEffect(() => {
    if (authenticationService.currentUserValue) {
      history.push('/logins')
    }
  })

  return (
    <div className='wrapper'>
      <div className='left'>
        <LoginPage />
      </div>
      <div className='right'>
        <Register />
      </div>
    </div>
  )
}

export default DefaultPage;