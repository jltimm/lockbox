import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import LoginsList from './LoginsList';

class Home extends Component {
  render() {
    return (
      <div>
        <LoginsList />
        <Container fluid>
          <Button color="link"><Link to="/logins">View all logins</Link></Button>
        </Container>
      </div>
    );
  }
}

export default Home;