import React, { Component } from "react";
import "../Full.css";
import API from "../api";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };
  componentDidMount() {}
  login = async e => {
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
      this.setState({ username: "", password: "" });
      this.props.navigate({ key: "new_log" });
    }
  };
  render() {
    return (
      <div className="Login transparent-background">
        <h2>Login</h2>
        <div className="login-form">
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
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
