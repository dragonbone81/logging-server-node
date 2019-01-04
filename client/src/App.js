import React, { Component } from 'react';
import './App.css';
import API from './api';

class App extends Component {
  state = {
    date: '',
  }
  getDateFromString = (input) => {
    try {
      const date = input.split(" ")[0];
      const time = input.split(" ")[1]
      const parts = time.match(/(\d+):?(\d+)?(AM|PM|am|pm)/);
      let hour = parseInt(parts[1]);
      let minute = parseInt(parts[2])
      if (parts[2] === undefined) {
        minute = 0;
      }
      const timeOfDay = parts[3];
      const timeObj = new Date(date);
      if (timeOfDay.toLocaleLowerCase() === 'pm' && hour < 12) {
        hour += 12;
      }
      timeObj.setHours(hour, minute, 0, 0);
      return timeObj.toLocaleString();
    } catch (err) {
      return "Bad Format";
    }
  }
  setDate = (date) => {
    API.get_logs();
    this.setState({ date: date });
  }
  render() {
    return (
      <div className="App">
        <div className="blurred-bg" />
        <div className="pure-g main-box">
          <div className="pure-u-1-1">
            <h2>Submit A Log</h2>
            <form className="pure-form">
              <input className="pure-input-rounded" onChange={({ target }) => this.setState({ date: target.value })} value={this.state.date} type="text" placeholder="Date" required />
              <input className="pure-input-rounded margin-left" type="text" placeholder="Method" required />
              <button onClick={() => this.setDate(this.getDateFromString(this.state.date))} type="button" className="pure-button pure-button-primary margin-left">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
