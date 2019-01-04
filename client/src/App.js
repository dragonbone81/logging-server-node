import React, { Component } from 'react';
import './Full.css';
import NewPost from './NewPost';
import ViewPosts from './ViewPosts';
import Nav from './Nav';

class App extends Component {
  state = {
    nav: {
      current: 'new_log',
      routes: [
        { key: 'new_log', value: 'Add Log' },
        { key: 'view_logs', value: 'View Logs' }
      ]
    }
  }
  navigate = (new_route) => {
    this.setState({ nav: { ...this.state.nav, current: new_route } });
  }
  render() {
    return (
      <div className="App">
        <div className="blurred-bg" />
        <div className="pure-g main-box">
          <div className="pure-u-1-1">
            <Nav nav={this.state.nav} navigate={this.navigate} />
          </div>
          <div className="pure-u-1-1">
            {(() => {
              switch (this.state.nav.current) {
                case 'new_log':
                  return <NewPost />
                case 'view_logs':
                  return <ViewPosts />
                default:
                  return <div><h2>Not Found</h2></div>
              }
            })()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
