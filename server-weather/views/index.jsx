import React from 'react';
import Layout from './layout';

export default class HomePage extends React.Component {
  render() {
    return (
      <Layout title={this.props.title}>
        <div id="root"></div>
      </Layout>
    );
  }
}
