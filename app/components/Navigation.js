import React, { Component } from 'react';
import { Link } from 'react-router';

import UserStore from '../stores/users';

const getState = () =>({ user: UserStore.currentUser});

export default class Navigation extends Component {

  constructor() {
    super();

    this.state = getState();
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    UserStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(getState());
  }

  render() {
    return (
      <ul>
        <li><Link to="/">Timeline</Link></li>
        <li><Link to="/users">Users</Link></li>
        <li><a href="/logout">Logout</a> ({this.state.user.username})</li>
      </ul>
    );
  }
}
