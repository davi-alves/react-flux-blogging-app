import React, { Component } from 'react';

import Home from './Home';

export default class extends Component {

  render() {
    return (
      <div>
        <div className="row">
          <h1>Chiper</h1>
        </div>
        <div className="row">
          <div className="three columns">Navigation</div>
          <div className="nine columns">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
