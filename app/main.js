import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';

import API from './api';
import App from './components/App';
import Home from './components/Home';
import User from './components/User';
import UserList from './components/UserList';

// init the api
API.init();

render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/user/:id" component={User}/>
      <Route path="/users" component={UserList}/>
    </Route>
  </Router>
), document.getElementById('app'));
