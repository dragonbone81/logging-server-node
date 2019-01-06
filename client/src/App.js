import React, { Component } from "react";
import "./Full.css";
import NewPost from "./Components/NewPost";
import ViewPosts from "./Components/ViewPosts";
import Data from "./Components/Data";
import Nav from "./Components/Nav";
import Login from "./Components/Login";
import Register from "./Components/Register";

class App extends Component {
  state = {
    nav: {
      current: "new_log",
      routes: [
        { key: "new_log", value: "Add Log", position: "left" },
        { key: "view_logs", value: "View Logs", position: "left" },
        { key: "data", value: "Data", position: "left" },
        { key: "login", value: "Login", position: "right" },
        { key: "register", value: "Register", position: "right" },
        { key: "logout", value: "Logout", position: "logout" }
      ]
    },
    user: {},
    getting_token: true
  };
  componentDidMount() {
    const user = window.localStorage.getItem("user");
    if (user) {
      this.setState({ user: JSON.parse(user) }, () =>
        this.setState({ getting_token: false })
      );
    }
    this.setState({ getting_token: false });
  }
  check_token = () => {
    if (!this.state.user.token && !this.state.getting_token) {
      this.navigate({ key: "login" });
      return false;
    } else {
      return true;
    }
  };
  set_user = user => {
    this.setState({ user });
  };
  logout = () => {
    window.localStorage.removeItem("user");
    this.setState({ user: {} });
  };
  navigate = new_route => {
    this.setState({ nav: { ...this.state.nav, current: new_route.key } });
    window.history.replaceState({}, new_route.value, new_route.key);
  };
  render() {
    return (
      <div className="App">
        <div className="blurred-bg" />
        <div className="pure-g main-box">
          <div className="pure-u-1-1">
            <Nav
              user={this.state.user}
              nav={this.state.nav}
              navigate={this.navigate}
              logout={this.logout}
            />
          </div>
          <div className="pure-u-1-1">
            {(() => {
              switch (this.state.nav.current) {
                case "new_log":
                  return (
                    <NewPost
                      user={this.state.user}
                      check_token={this.check_token}
                    />
                  );
                case "view_logs":
                  return (
                    <ViewPosts
                      user={this.state.user}
                      check_token={this.check_token}
                    />
                  );
                case "data":
                  return (
                    <Data
                      user={this.state.user}
                      check_token={this.check_token}
                    />
                  );
                case "login":
                  return (
                    <Login navigate={this.navigate} set_user={this.set_user} />
                  );
                case "register":
                  return (
                    <Register
                      navigate={this.navigate}
                      set_user={this.set_user}
                    />
                  );
                default:
                  return (
                    <div>
                      <h2>Not Found</h2>
                    </div>
                  );
              }
            })()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
