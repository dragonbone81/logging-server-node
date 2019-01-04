import React, { Component } from 'react';
import './Full.css';
import API from './api';

class ViewPosts extends Component {
    state = {
        logs: []
    }
    async componentDidMount() {
        console.log(await API.get_logs());
        this.setState({ logs: await API.get_logs() })
    }
    render() {
        return (
            <div className="ViewPosts">
                <h2>Your Posts</h2>
                <table className="pure-table pure-table-horizontal log-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Method</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.logs.map((log) => {
                            return (
                                <tr key={log._id} className="table-row hover-cursor">
                                    <td>{log.date}</td>
                                    <td>{log.method}</td>
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
