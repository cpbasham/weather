import React, { Component } from 'react';
import {getDate, getDay, getTime, getWindBearing} from './helpers';
import Chart from './Chart';

export default class Forecast extends Component {
  constructor(props) {
    super(props);
    this.getQuickStatList = this.getQuickStatList.bind(this);
    this.formatForecast = this.formatForecast.bind(this);
    this.getChart = this.getChart.bind(this);
    this.getXAxis = this.getXAxis.bind(this);
    this.getSeries = this.getSeries.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  render() {
    return (
      <div className="Forecast">
        {this.props.status}<br />
        <h4>{this.props.location}</h4>
        {this.formatForecast()}
      </div>
    );
  }

  formatForecast() {
    const forecast = this.props.forecast;
    const currently = forecast.currently;
    if (currently === undefined) { return; }

    let time = "", date = "";
    date = getDate(currently);
    time = getTime(currently);
    return (
      <div className="Forecast">
        <h3>Forecast as of {time}, {date}</h3>
        {this.getQuickStatList(currently)}
        <h4>{forecast.minutely.summary}</h4>
        <h4>{forecast.hourly.summary}</h4>
        {this.getChart("Hourly", forecast.hourly)}
        <h4>{forecast.daily.summary}</h4>
        {this.getChart("Daily", forecast.daily)}
      </div>
    );
  }

  getQuickStatList(c) {
    const statElements = [
      {title: "Temperature", value: c.temperature.toFixed(0) + "°"},
      {title: "Feels like",  value: c.apparentTemperature.toFixed(0) + "°"},
      {title: "Humidity",    value: (c.humidity*100).toFixed(0) + "%"},
      {title: "UV Index",    value: c.uvIndex},
      {title: "Visibility",  value: c.visibility},
      {title: "Wind",        value: c.windSpeed.toFixed(0) + "mph (" + getWindBearing(c) + ")"}
    ]
      .map((stat, i) => {
        return (
          <li key={i} className="col-xs-2">
            <span className="title">{stat.title}</span>
            <span className="value">{stat.value}</span>
          </li>
        );
      });
    return (
      <ul className="current quick-stats row">
        {statElements}
      </ul>
    );
  }

  getChart(id, dataSrc) {
    // console.log(id, dataSrc);
    let xAxis_categories = this.getXAxis(id, dataSrc);

    let series = this.getSeries(id, dataSrc);
    let options = { id: `${id} temps`, xAxis_categories, series, location: this.props.location}
    return <Chart {...options}/>;
  }

  getXAxis(id, dataSrc) {
    switch(id) {
      case "Hourly": {
        return dataSrc.data.map(obj => {
          return getTime(obj);
        });
      }
      case "Daily": {
        return dataSrc.data.map(obj => {
          return getDay(obj);
        });
      }
      default: {
        return null;
      }
    }
  }

  getSeries(id, dataSrc) {
    switch (id) {
      case "Hourly": {
        return [{
          name: id,
          data: dataSrc.data.map(obj => {
            return {name: obj.summary, y: Math.round(obj.temperature)}
          })
        }];
      }
      case "Daily": {
        return [{
          name: id + " temp low",
          data: dataSrc.data.map(obj => {
            return {name: obj.summary, y: Math.round(obj.temperatureLow)}
          })
        }, {
          name: id + " temp high",
          data: dataSrc.data.map(obj => {
            return {name: obj.summary, y: Math.round(obj.temperatureHigh)}
          })
        }];
      }
      default: {
        return null;
      }
    }
  }
}
