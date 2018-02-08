import React from 'react';
import Layout from './layout';

export default class HelloMessage extends React.Component {
  render() {
    return (
      <Layout title={this.props.title}>
        <div>This is an error! {this.props.error}</div>
      </Layout>
    );
  }
}
