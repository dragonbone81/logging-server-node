import React, { Component } from "react";
import "../Full.css";
import API from "../api";

class Register extends Component {
  state = {
    username: "",
    password: "",
    registering: false,
    register_error: false
  };
  componentDidMount() {}
  register = async e => {
    this.setState({ registering: true, register_error: false });
    e.preventDefault();
    const response = API.register({
      username: this.state.username,
      password: this.state.password
    });
    const { token } = await response;
    if (token) {
      this.props.set_user({ token, username: this.state.username });
      window.localStorage.setItem(
        "user",
        JSON.stringify({ token, username: this.state.username })
      );
      this.setState({ username: "", password: "" });

      this.props.navigate({ key: "new_log" });
    } else {
      this.setState({ register_error: true });
    }
    this.setState({ registering: false });
  };
  render() {
    return (
      <div className="Register transparent-background">
        <h2>Register</h2>
        <div className="register-form">
          {this.state.register_error && (
            <span className="span-error">*Could not Register</span>
          )}
          <form
            onSubmit={this.register}
            className="pure-form pure-form-aligned"
          >
            <fieldset>
              <div className="pure-control-group">
                <input
                  required
                  className="pure-input-rounded"
                  id="name"
                  type="text"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={({ target }) =>
                    this.setState({ username: target.value })
                  }
                />
              </div>

              <div className="pure-control-group">
                <input
                  required
                  className="pure-input-rounded"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={({ target }) =>
                    this.setState({ password: target.value })
                  }
                />
              </div>
              <button type="submit" className="pure-button button-success">
                Register
                {this.state.registering && (
                  <i className="fas fa-sync fa-spin register-spinner" />
                )}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
