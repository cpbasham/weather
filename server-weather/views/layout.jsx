import React from 'react';

export default class Layout extends React.Component {
  render() {
    return (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="theme-color" content="#000000" />

          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
          <link rel="stylesheet" href="/public/bundle.css" />

          <title>React App</title>
        </head>
        <body>
          <noscript>
            You need to enable JavaScript to run this app.
          </noscript>
          {this.props.children}
          <script src="/public/bundle.js"></script>
        </body>
      </html>
    );
  }
}
