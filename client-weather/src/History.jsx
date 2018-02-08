import React, { Component } from 'react';
import Chart from './Chart';

export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      date: "",
      series: "",
      xAxis_categories: ""
    }
    this.renderChart = this.renderChart.bind(this);
    this.requestChartData = this.requestChartData.bind(this);
    this.getXAxis = this.getXAxis.bind(this);
    this.getSeries = this.getSeries.bind(this);
  }
  componentDidMount() {
    this.requestChartData("Today in history");
  }
  componentDidUpdate(prevProps, prevState) {
  }
  render() {
    return (
      <div className="History">
        <h4>Historical Data</h4>
        {this.renderChart()}
      </div>
    );
  }

  renderChart() {
    if (this.state.series === "") { return; }
    else { /*console.log("Full render should happen");*/ return <Chart {...this.state}/> }
  }

  requestChartData(id) {
    this.setState({id, date: new Date()}, () => {
      this.setState({xAxis_categories: this.getXAxis()}, async () => {
        let series = await this.getSeries();
        this.setState({series});
      });
    });
  }

  getXAxis() {
    let year = this.state.date.getFullYear();
    let years = [];
    // for (let i=0; i<100; i+=5) {
    for (let i=0; i<75; i+=5) {
      years.unshift(year-i);
    }
    return years;
  }

  async getSeries() {
    let forecasts = await Promise.all(this.state.xAxis_categories.map(async year => {
      let yearDate = new Date(this.state.date);
      yearDate.setFullYear(year);
      let timestamp = Math.floor(yearDate.getTime() / 1000);
      const lat = this.props.lat, lng = this.props.lng;
      const response = await fetch(`/api/v1/forecast?lat=${lat}&lng=${lng}&time=${timestamp}`);
      return response.json();
    }));
    // console.log("FORECASTS", forecasts);
    let dayForecasts = forecasts.map(forecast => {
      return forecast.daily.data[0];
    });
    // console.log("DAY_FORECASTS", dayForecasts);
    let series = [{
      name: "historical temp low",
      data: dayForecasts.map(obj => {
        return {name: obj.summary, y: Math.round(obj.temperatureLow)}
      })
    }, {
      name: "historical temp high",
      data: dayForecasts.map(obj => {
        return {name: obj.summary, y: Math.round(obj.temperatureHigh)}
      })
    }]
    // console.log("RETURNING SERIES", series);
    return series;
    // console.log("SERIES", series);
  }

}
