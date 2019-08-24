import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class LoginEdit extends Component {

  /**
   * Default, empty item
   */
  emptyItem = {
    website: '',
    username: '',
    password: ''
  };

  /**
   * Setup the component
   * @param {props} props The props 
   */
  constructor(props) {
    super(props);
    this.state = {item: this.emptyItem};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * On mount, check if the params does not contain "new". If it does,
   * do nothing and initialize with emptyItem, otherwise fetch from API
   */
  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const login = await (await fetch(`/api/login/${this.props.match.params.id}`)).json();
      this.setState({item: login});
    }
  }

  /**
   * Handles changes, sets state of the item when new values entered
   * @param {event} event The event
   */
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  /**
   * Handles submit. Check if we're updating an existing login or adding
   * a new one, and make the appropriate request, then redirect back to logins.
   * @param {event} event 
   */
  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;
    const endpoint = item._id ? '/api/login/' + item._id : '/api/login';
    await fetch(endpoint, {
      method: (item._id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/logins');
  }

  /**
   * Render the component
   */
  render() {
    const {item} = this.state;
    const title = <h2>{this.props.match.params.id !== 'new' ? 'Edit Login' : 'Add Login'}</h2>;
    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="website">Website</Label>
            <Input type="text" name="website" id="website" value={item.website || ''}
                   onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input type="text" name="username" id="username" value={item.username || ''}
                   onChange={this.handleChange} autoComplete="username"/>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="text" name="password" id="password" value={item.password || ''}
                   onChange={this.handleChange} autoComplete="password"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/logins">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(LoginEdit);