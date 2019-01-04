import React, { Component } from 'react';
import './Full.css';

class ViewPosts extends Component {
    render() {
        return (
            <div className="ViewPosts">
                <h2>Your Posts</h2>
                {/* <form className="pure-form">
                    <input className="pure-input-rounded" onChange={({ target }) => this.setState({ date: target.value })} value={this.state.date} type="text" placeholder="Date" required />
                    <input className="pure-input-rounded margin-left" onChange={({ target }) => this.setState({ method: target.value })} value={this.state.method} type="text" placeholder="Method" required />
                    <button onClick={this.setDate} type="button" className="pure-button pure-button-primary margin-left">Submit</button>
                </form> */}
            </div>
        );
    }
}

export default ViewPosts;
