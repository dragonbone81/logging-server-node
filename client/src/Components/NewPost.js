import React, { Component } from "react";
import "../Full.css";
import API from "../api";

class NewPost extends Component {
  state = {
    date: "",
    method: "",
    date_error: "Bad Format",
    adding_log: false
  };
  componentDidMount() {
    if (!this.props.user.token) {
      this.props.navigate({ key: "login" });
      return;
    }
  }
  componentDidUpdate() {
    if (!this.props.user.token) {
      this.props.navigate({ key: "login" });
      return;
    }
  }
  getDateFromString = input => {
    try {
      const date = input.split(" ")[0];
      const time = input.split(" ")[1];
      const parts = time.match(/(\d+):?(\d+)?(AM|PM|am|pm)/);
      let hour;
      let minute;
      if (time.length >= 5 && !time.includes(":")) {
        const totalTime = parts[1];
        if (totalTime.length === 4) {
          hour = parseInt(totalTime.substring(0, 2));
          minute = parseInt(totalTime.substring(2));
        } else {
          hour = parseInt(totalTime.substring(0, 1));
          minute = parseInt(totalTime.substring(1));
        }
      } else {
        hour = parseInt(parts[1]);
        minute = parseInt(parts[2]);
        if (parts[2] === undefined) {
          minute = 0;
        }
      }
      const timeOfDay = parts[3];
      const timeObj = new Date(date);
      if (timeOfDay.toLocaleLowerCase() === "pm" && hour < 12) {
        hour += 12;
      }
      timeObj.setHours(hour, minute, 0, 0);
      return timeObj.toLocaleString();
    } catch (err) {
      return this.state.date_error;
    }
  };
  setDate = async () => {
    const date = this.getDateFromString(this.state.date);
    if (!date || !this.state.method || date === this.state.date_error) {
      return;
    }
    this.setState({ adding_log: true });
    console.log(
      await API.post_log(
        { date, method: this.state.method },
        this.props.user.token
      )
    );
    this.setState({ date: "", method: "", adding_log: false });
  };
  render() {
    return (
      <div className="NewPost transparent-background">
        <h2>Submit A Log</h2>
        <form className="pure-form">
          <input
            className="pure-input-rounded"
            onChange={({ target }) => this.setState({ date: target.value })}
            value={this.state.date}
            type="text"
            placeholder="Date"
            required
          />
          <input
            className="pure-input-rounded margin-left"
            onChange={({ target }) => this.setState({ method: target.value })}
            value={this.state.method}
            type="text"
            placeholder="Method"
            required
          />
          <button
            onClick={this.setDate}
            type="button"
            className={
              "pure-button pure-button-primary margin-left" +
              (this.state.adding_log ? " pure-button-disabled" : "")
            }
          >
            {this.state.adding_log ? (
              <i className="fas fa-cog fa-spin add-log-spinner" />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    );
  }
}

export default NewPost;
