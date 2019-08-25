import React, { Component } from 'react';
import './App.css';
import { Router, Route, Link } from 'react-router-dom';
import { history } from './_helpers/history';
import { authenticationService } from './services/authentication-service';
import { LoginPage } from './components/LoginPage';
import { PrivateRoute } from './components/PrivateRoute';
import LoginsList from './components/LoginsList'
import LoginEdit from './components/LoginEdit'

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
        {currentUser &&
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
              <Link to="/logins" className="nav-item nav-link">Home</Link>
              <a onClick={this.logout} className="nav-item nav-link">Logout</a>
            </div>
          </nav>
        }
        <PrivateRoute exact path="/logins" component={LoginsList} />
        <PrivateRoute path='/logins/:id' component={LoginEdit}/>
        <Route path="/login" component={LoginPage} />
      </div>
    </Router>
  );
}
}

export default App;