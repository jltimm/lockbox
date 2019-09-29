import React, { Component } from 'react';
import './App.css';
import { Router, Route } from 'react-router-dom';
import { history } from './_helpers/history';
import { authenticationService } from './services/authentication-service';
import Home from './components/Home'
import DefaultPage from './components/DefaultPage'
import { PrivateRoute } from './components/PrivateRoute';
import LoginsList from './components/LoginsList'
import LoginView from './components/LoginView'
import { Navbar, Button } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
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
        <Navbar className="bg-light justify-content-between" bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="/">Lockbox</Navbar.Brand>
            {currentUser &&
              <Button onClick={this.logout} className="nav-item nav-link">Logout</Button>
            }
        </Navbar>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={DefaultPage} />
        <PrivateRoute exact path="/logins" component={LoginsList} />
        <PrivateRoute path='/logins/:id' component={LoginView}/>
      </div>
    </Router>
  );
}
}

export default App;
