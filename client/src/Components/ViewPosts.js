import React, { Component } from "react";
import "../Full.css";
import API from "../api";

class ViewPosts extends Component {
  state = {
    logs: [],
    log_clicked: false,
    deleting_log: false,
    getting_logs: false,
    confirm_dialog: false,
    log_clicked_id: null
  };
  componentDidMount() {
    if (!this.props.user.token) {
      this.props.navigate({ key: "login" });
      return;
    }
    this.load_logs();
  }
  componentDidUpdate() {
    if (!this.props.user.token) {
      this.props.navigate({ key: "login" });
      return;
    }
  }
  load_logs = async () => {
    this.setState({ getting_logs: true, logs: [] });
    const logs = await API.get_logs(this.props.user.token);
    this.setState({ logs, getting_logs: false });
  };
  open_confirm = id => {
    this.setState({ confirm_dialog: true, log_clicked_id: id });
  };
  close_confirm = () => {
    this.setState({ confirm_dialog: false, log_clicked_id: null });
  };
  delete_log = async () => {
    const id = this.state.log_clicked_id;
    this.close_confirm();
    this.setState({ log_clicked: id, deleting_log: true });
    const response = await API.delete_log(id, this.props.user.token);
    if (response) {
      this.setState({
        logs: this.state.logs.filter((log, index) => index !== id)
      });
    }
    this.setState({ log_clicked: false, deleting_log: false });
  };
  render() {
    return (
      <div className="ViewPosts transparent-background">
        {this.state.confirm_dialog ? (
          <div className="confirm-top">
            <div className="react-confirm-alert">
              <div className="confirm-body">
                <div className="confirm-text">Are you sure?</div>
                <br />
                <button
                  onClick={this.delete_log}
                  className="pure-button pure-button-primary"
                >
                  Yes
                </button>
                <button
                  onClick={this.close_confirm}
                  className="pure-button pure-button-primary button-confirm-no"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <h2>
          Your Posts{" "}
          <i
            onClick={this.load_logs}
            className="fas fa-sync refresh-logs hover-cursor"
          />
        </h2>
        <table className="pure-table pure-table-horizontal log-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Method</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.getting_logs ? (
              <tr>
                <td colSpan={3}>
                  <div>
                    <i className="fas fa-cog fa-spin loading-logs-spinner" />
                  </div>
                </td>
              </tr>
            ) : null}
            {this.state.logs.length === 0 && !this.state.getting_logs ? (
              <tr>
                <td colSpan={3}>
                  <div>No Logs...</div>
                </td>
              </tr>
            ) : null}
            {this.state.logs.map((log, index) => {
              return (
                <tr key={index} className="table-row hover-cursor">
                  <td>{log.date}</td>
                  <td>{log.method}</td>
                  <td>
                    {this.state.log_clicked === index &&
                    this.state.deleting_log ? (
                      <i className="fas fa-cog fa-spin delete-log-spinner" />
                    ) : (
                      <div
                        onClick={() => this.open_confirm(index)}
                        className="delete-log"
                      >
                        x
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ViewPosts;
