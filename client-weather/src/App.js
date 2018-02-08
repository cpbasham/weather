import React, { Component } from 'react';
import Search from './Search';
import Forecast from './Forecast';
import Warnings from './Warnings';
import History from './History';
import {filterForecastData} from './helpers';
// import Map from './Map';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.resetState();
    this.resetState = this.resetState.bind(this);
    this.getHistory = this.getHistory.bind(this);
  }
  render() {
    // console.log(this.state);
    return (
      <div className="App">
        <Search onSearch={this.onSearch.bind(this)}
                onCoordsFound={this.onCoordsFound.bind(this)}
                onLocationFound={this.onLocationFound.bind(this)}
                onForecastFound={this.onForecastFound.bind(this)}
                onHistoryFound={this.onHistoryFound.bind(this)} />
        <Warnings forecast={this.state.forecast}></Warnings>
        <Forecast {...this.state} />
        {this.getHistory()}
        <a href="https://darksky.net/poweredby/">Powered by Dark Sky</a>
      </div>
    );
  }
  resetState() {
    this.state = {
      status: "No location",
      lat: "",
      lng: "",
      location: "",
      forecast: {},
      history: ""
    };
  }
  onSearch() {
    this.setState({status: "Searching..."});
  }
  onCoordsFound(coords) {
    const {lat, lng} = coords;
    this.setState({lat, lng});
  }
  onLocationFound(location) {
    this.setState({location, status: "Gathering forecast data"});
  }
  onForecastFound(forecast) {
    this.setState({
      forecast: filterForecastData(forecast),
      status: ""
    });
    // console.log(filterForecastData(forecast));
  }
  onHistoryFound(history) {
    this.setState({history});
  }

  getHistory() {
    if (this.state.lat === "") { return; }
    else {
      // console.log("GETHISTORY", this.state);
      return <History lat={this.state.lat.toString()} lng={this.state.lng.toString()}/>
    }
  }
}
