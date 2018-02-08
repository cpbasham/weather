import React, { Component } from 'react';

export default class Map extends Component {
  render() {
    return (
      <iframe
        id="map"
        title="Map"
        width="600"
        height="450"
        frameBorder="0" style={{border:0}}
        src={this.getGMURI("los+angeles")}
        allowFullScreen>
      </iframe>
    );
  }
  getGMURI(query) {
    let uri = "https://www.google.tg/maps/embed/v1/search";
    // uri += "?key=" + process.env.GMKey;
    uri += "?key=AIzaSyD_5pnnBaKsFasIheaSdwQ7qc4fWOM4AOU";
    uri += "&q=" + query;
    return uri;
  }
}
