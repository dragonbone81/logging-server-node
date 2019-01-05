import React, { Component } from 'react';
import './Full.css';
import API from './api';
import { Bar } from 'react-chartjs-2';

class Data extends Component {
    state = {
        logs: [],
        labels: [],
        data: [],
    }
    componentDidMount() {
        this.load_logs();
    }
    load_logs = async () => {
        this.setState({ logs: [] })
        const logs = await API.get_logs();
        this.setState({ logs });
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
                    data[type] = [(day_data[type] || 0)];
                }
            })
        })
        const dataset = types.map(type => {
            return { label: type, backgroundColor: '#9B7EDE', data: data[type] }
        });
        this.setState({ labels, data: dataset });
    }
    render() {
        return (
            <div className="Data transparent-background">
                <Bar
                    data={{
                        labels: this.state.labels,
                        datasets: this.state.data,
                    }}
                    width={100}
                    height={50}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }}
                />
            </div>
        );
    }
}

export default Data;
