import React, { Component } from 'react';

export default class Warnings extends Component {
  constructor(props) {
    super(props);
    this.listWarnings = this.listWarnings.bind(this);
  }
  render() {
    // console.log(this.props);
    return this.listWarnings();
  }
  listWarnings() {
    if (this.props.forecast.alerts === undefined) { return <div className="Warnings"></div>; }
    const alerts = this.props.forecast.alerts;
    const warningElements = alerts.map((warning, i) => {
      return (
        <a key={i} href={warning.uri} className={warning.severity}>
          <h3>{warning.title}</h3>
        </a>
      );
    });
    return (
      <div className="Warnings">
        {warningElements}
      </div>
    );
  }
}
