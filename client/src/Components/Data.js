import React, { Component } from "react";
import "../Full.css";
import API from "../api";
import { Bar, Bubble } from "react-chartjs-2";

class Data extends Component {
  state = {
    logs: [],
    labels: [],
    data: [],
    bubble_data: [],
    chart: 1,
    total_charts: 2
  };
  componentDidMount() {
    if (this.props.check_token()) {
      this.load_logs();
      document.title = "Data";
    }
  }
  componentDidUpdate() {
    this.props.check_token();
  }
  load_logs = async () => {
    this.setState({ logs: await API.get_logs(this.props.user.token) });
  };
  getBubbleData = () => {
    const { logs } = this.state;
    const grouped_by_hours = {};
    logs.forEach(log => {
      const hour = new Date(log.date).getHours();
      if (hour in grouped_by_hours) {
        grouped_by_hours[hour].push(log);
      } else {
        grouped_by_hours[hour] = [log];
      }
    });
    const grouped_by_hours_arr = Object.keys(grouped_by_hours).map(key => {
      return grouped_by_hours[key];
    });
    const data = [];
    grouped_by_hours_arr.forEach(el => {
      const y = new Date(el[0].date).getHours();
      data.push({ x: 10, y, r: el.length * 5 });
    });
    return data;
  };
  getBarData = () => {
    const { logs } = this.state;
    const labels = [...new Set(logs.map(log => log.date.split(",")[0]))];
    const types = [...new Set(logs.map(log => log.method))];
    const data_per_day = {};
    logs.forEach(log => {
      if (log.date.split(",")[0] in data_per_day) {
        if (log.method in data_per_day[log.date.split(",")[0]]) {
          data_per_day[log.date.split(",")[0]][log.method] += 1;
        } else {
          data_per_day[log.date.split(",")[0]][log.method] = 1;
        }
      } else {
        data_per_day[log.date.split(",")[0]] = {};
        data_per_day[log.date.split(",")[0]][log.method] = 1;
      }
    });
    const data = {};
    labels.forEach(label => {
      const day_data = data_per_day[label];
      types.forEach(type => {
        if (type in data) {
          data[type].push(day_data[type] || 0);
        } else {
          data[type] = [day_data[type] || 0];
        }
      });
    });
    const datasets = types.map(type => {
      return { label: type, backgroundColor: "#9B7EDE", data: data[type] };
    });
    return { labels, datasets };
  };
  render() {
    return (
      <div className="transparent-background Data">
        <div className="charts">
          {this.state.chart === 1 && (
            <Bar
              data={this.getBarData()}
              width={100}
              height={50}
              options={{
                maintainAspectRatio: false,
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true
                      }
                    }
                  ]
                }
              }}
            />
          )}
          {this.state.chart === 2 && (
            <Bubble
              data={{
                datasets: [
                  {
                    label: "Grouped By Time",
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    data: this.getBubbleData()
                  }
                ]
              }}
              width={100}
              height={50}
              options={{
                maintainAspectRatio: false
              }}
            />
          )}
        </div>
        <button
          className="pure-button pure-button-primary"
          onClick={() => {
            if (this.state.chart - 1 === 0) {
              this.setState({ chart: this.state.total_charts });
            } else {
              this.setState({ chart: this.state.chart - 1 });
            }
          }}
        >
          Prev
        </button>
        <button
          className="pure-button pure-button-primary margin-left"
          onClick={() => {
            if (this.state.chart + 1 > this.state.total_charts) {
              this.setState({ chart: 1 });
            } else {
              this.setState({ chart: this.state.chart + 1 });
            }
          }}
        >
          Next
        </button>
      </div>
    );
  }
}

export default Data;
