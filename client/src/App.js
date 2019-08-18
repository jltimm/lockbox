import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginsList from './LoginsList';
import LoginEdit from './LoginEdit';
import Home from './Home';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/logins' exact={true} component={LoginsList}/>
          <Route path='/logins/:id' component={LoginEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
