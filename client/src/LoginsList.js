import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';

class LoginsList extends Component {

  constructor(props) {
    super(props);
    this.state = {logins: []};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    fetch('/api/logins')
      .then(data => data.json())
      .then(res => this.setState({logins: res.logins}));
  }

  async remove(id) {
    await fetch(`/api/login/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedLogins = [...this.state.logins].filter(i => i._id !== id);
      this.setState({logins: updatedLogins});
    });
  }

  render() {
    var {logins} = this.state;
    const loginsList = logins.map(login => {
      return <tr key={login._id}>
        <td>{login.website}</td>
        <td>{login.username}</td>
        <td>{login.password}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/logins/" + login._id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(login._id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/logins/new">Add another login</Button>
          </div>
          <h3>Logins</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Website</th>
                <th width="20%">Username</th>
                <th>Password</th>
                <th width="10%">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loginsList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default withRouter(LoginsList);