import React, { Component } from "react";
import "../Full.css";
import API from "../api";

class Login extends Component {
  state = {
    username: "",
    password: "",
    logging_in: false,
    login_error: false
  };
  componentDidMount() {
    document.title = "Login";
  }
  login = async e => {
    this.setState({ logging_in: true, login_error: false });
    e.preventDefault();
    const response = API.login({
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
      this.props.navigate({ key: "new_log" });
    } else {
      this.setState({ login_error: true });
      this.setState({ logging_in: false });
    }
  };
  render() {
    return (
      <div className="Login transparent-background">
        <h2>Login</h2>
        <div className="login-form">
          {this.state.login_error && (
            <span className="span-error">*Could not Login</span>
          )}
          <form onSubmit={this.login} className="pure-form pure-form-aligned">
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
                Login
                {this.state.logging_in && (
                  <i className="fas fa-sync fa-spin login-spinner" />
                )}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
