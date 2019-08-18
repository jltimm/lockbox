import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginsList from './LoginsList';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/logins' exact={true} component={LoginsList}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
