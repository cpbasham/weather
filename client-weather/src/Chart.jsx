import React, { Component } from 'react';
import Highcharts from 'highcharts';

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.mountChart = this.mountChart.bind(this);
  }
  componentDidMount() {
    this.mountChart();
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.location !== nextProps.location;
  }
  componentWillUpdate() {
    this.mountChart();
  }
  render() {
    return (
      <div className="Chart">
        <div id={this.props.id} className="chart-container">
        </div>
      </div>
    );
  }
  mountChart() {
    const {id, xAxis_categories, series} = this.props;
    // console.log(xAxis_categories);
    // console.log(series);
    const myChart = Highcharts.chart(id, {
      chart: {
        type: 'line',
        backgroundColor: '#555',
      },
      title: { text: id },
      xAxis: {
        categories: xAxis_categories
      },
      yAxis: { title: "°F" },
      series
    });
    return myChart;
  }
}
