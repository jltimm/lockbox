import React, { useEffect } from "react";
import LoginPage from "./LoginPage";
import '../App.css';
import Register from './Register';
import { useHistory } from 'react-router-dom';
import { authenticationService } from '../services/authentication-service';
import { Container } from "react-bootstrap";

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
    <Container>
      <div className='wrapper'>
        <Container>
          <div className='left'>
            <LoginPage />
          </div>
        </Container>
        <Container>
          <div className='right'>
            <Register />
          </div>
        </Container>
      </div>
    </Container>
  )
}

export default DefaultPage;