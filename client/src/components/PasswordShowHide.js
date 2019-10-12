import React, { Component } from "react";
import { IconButton } from '@material-ui/core/';
import VisibilityIcon from '@material-ui/icons/Visibility';

class PasswordShowHide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: true,
      password: ""
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  componentDidMount() {
    if (this.props.password) {
      this.setState({ password: this.props.password });
    }
  }

  render() {
    return (
      <div>
        <label
          type={this.state.hidden ? "password" : "text"}
          onChange={this.handlePasswordChange}
        >{this.state.hidden ? "*******" : this.state.password}</label>
          <IconButton onClick={this.toggleShow} icon="camera">
            <VisibilityIcon></VisibilityIcon>
          </IconButton>
      </div>
    );
  }
}

export default PasswordShowHide;