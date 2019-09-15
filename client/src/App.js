import React, { Component, Button } from 'react';
import './App.css';
import { Router, Route } from 'react-router-dom';
import { history } from './_helpers/history';
import { authenticationService } from './services/authentication-service';
import Home from './components/Home'
import DefaultPage from './components/DefaultPage'
import { PrivateRoute } from './components/PrivateRoute';
import LoginsList from './components/LoginsList'
import LoginEdit from './components/LoginEdit'
import { Navbar, Nav, Form, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
        offlineMode: false,
    };
}

componentDidMount() {
  authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
}

logout() {
  authenticationService.logout();
  history.push('/login');
}

render() {
  const { currentUser } = this.state;
  return (
    <Router history={history}>
      <div>
          <Navbar bg="dark" variant="dark" expand="lg">
              <Navbar.Brand href="/">Lockbox</Navbar.Brand>
                {currentUser &&
                    <div>
                    <Nav.Link to="/logins">Home</Nav.Link>
                    <Button onClick={this.logout} className="nav-item nav-link">Logout</Button>
                </div>
                }
                <Nav.Link href="/login">Login</Nav.Link>
          </Navbar>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={DefaultPage} />
        <PrivateRoute exact path="/logins" component={LoginsList} />
        <PrivateRoute path='/logins/:id' component={LoginEdit}/>
      </div>
    </Router>
  );
}
}

export default App;
