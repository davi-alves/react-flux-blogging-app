import React, { Component } from 'react';

import Home from './Home';
import Navigation from './Navigation';

const App = (props) => {
  return (
    <div>
      <div className="row">
        <h1>Chiper</h1>
      </div>
      <div className="row">
        <div className="three columns">
          <Navigation/>
        </div>
        <div className="nine columns">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default App;
