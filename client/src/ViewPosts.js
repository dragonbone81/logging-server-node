import React, { Component } from 'react';
import './Full.css';
import API from './api';

class ViewPosts extends Component {
    state = {
        logs: [],
        log_clicked: false,
        deleting_log: false,
        getting_logs: false,
    }
    componentDidMount() {
        this.load_logs();
    }
    load_logs = async () => {
        this.setState({ getting_logs: true, logs: [] })
        const logs = await API.get_logs();
        this.setState({ logs, getting_logs: false })
    }
    delete_log = async (id) => {
        this.setState({ log_clicked: id, deleting_log: true })
        const response = await API.delete_log(id);
        if (response) {
            this.setState({ logs: this.state.logs.filter((log) => log._id !== id) })
        }
        this.setState({ log_clicked: false, deleting_log: false })
    }
    render() {
        return (
            <div className="ViewPosts">
                <h2>Your Posts <i onClick={this.load_logs} className="fas fa-sync refresh-logs hover-cursor"></i></h2>
                <table className="pure-table pure-table-horizontal log-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Method</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.getting_logs ? <tr><td colSpan={3}><div><i className="fas fa-cog fa-spin loading-logs-spinner" /></div></td></tr> : null}
                        {this.state.logs.length === 0 && !this.state.getting_logs ? <tr><td colSpan={3}><div>No Logs...</div></td></tr> : null}
                        {this.state.logs.map((log) => {
                            return (
                                <tr key={log._id} className="table-row hover-cursor">
                                    <td>{log.date}</td>
                                    <td>{log.method}</td>
                                    <td>
                                        {
                                            this.state.log_clicked === log._id && this.state.deleting_log ?
                                                <i className="fas fa-cog fa-spin delete-log-spinner" />
                                                :
                                                <div onClick={() => this.delete_log(log._id)} className="delete-log">x</div>
                                        }
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ViewPosts;
