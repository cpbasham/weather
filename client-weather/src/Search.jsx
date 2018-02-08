import React, { Component } from 'react';

export default class Search extends Component {
  constructor(props) {
     super(props);
     this.state = { query: undefined, searchHistory: [] };
     this.handleSubmit = this.handleSubmit.bind(this);
     this.getSearchHistoryOptions = this.getSearchHistoryOptions.bind(this);
     this.setQuery = this.setQuery.bind(this);
     this.makeQuery = this.makeQuery.bind(this);
  }
  componentDidMount() { // for testing
    // this.state = { query: "80210" };
    // this.handleSubmit({preventDefault: ()=>null});
    if (localStorage.searchHistory === undefined) {
      localStorage.searchHistory = JSON.stringify([]);
    } else {
      this.setState({searchHistory: JSON.parse(localStorage.searchHistory)})
    }
  }
  render() {
    return (
      <div className="Search">
        <form onSubmit={this.handleSubmit}>
          <h4>Location</h4>
          <input type="text"
                 name="location"
                 autoComplete="off"
                 onChange={this.setQuery}/>
        </form>
        <select onChange={this.makeQuery}>
          {this.getSearchHistoryOptions()}
        </select>
        <br />
      </div>
    );
  }

  setQuery(e) { this.setState({query: e.target.value}) }
  makeQuery(e) {
    this.setState({query: e.target.value},
                    ()=>this.handleSubmit(e)
    );
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (this.state.query === undefined) { return false; }
    this.props.onSearch();
    this.updateSearchHistory(this.state.query);
    const [locationData] = await requestLocationData(this.state.query);
    const {formatted_address, geometry:{location}} = locationData;
    // console.log("SEARCH-LOCATION", location);
    this.props.onCoordsFound(location);
    this.props.onLocationFound(formatted_address);
    const forecast = await requestForecast(location);
    this.props.onForecastFound(forecast);
    // this.props.onSearchComplete(formatted_address, forecast);
  }

  getSearchHistoryOptions() {
    return this.state.searchHistory.map((search, i) => {
      return <option key={i}>{search}</option>
    });
  }

  updateSearchHistory(query) {
    if (this.state.searchHistory.includes(query)) { return; }
    this.state.searchHistory.push(query);
    localStorage.setItem("searchHistory", JSON.stringify(this.state.searchHistory));
  }
}

async function requestLocationData(location) {
  const response = await fetch(`/api/v1/geocode/${location}`);
  return response.json();
}

async function requestForecast(coords) {
  const {lat, lng} = coords;
  const response = await fetch(`/api/v1/forecast?lat=${lat}&lng=${lng}`);
  return response.json();
}
