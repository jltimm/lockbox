import React, { useEffect } from "react";
import '../App.css';
import { authenticationService } from '../services/authentication-service';
import { useHistory } from 'react-router-dom';

/**
 * Home page, displays a welcome message
 */
function Home() {

  let history = useHistory();

  useEffect(() => {
    if (authenticationService.currentUserValue) {
      history.push('/logins')
    }
  })

  return (
    <div class='jumbotron'>
      <h1>Welcome to Lockbox!</h1>
    </div>  
  )
}

export default Home;