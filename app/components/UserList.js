import React, { Component } from 'react';
import { Link } from 'react-router';

import actions from '../actions';
import UserStore from '../stores/users';
import UserListItem from './UserListItem';

const getUserData = function () {
  return {
    users: UserStore.all(),
    user: UserStore.currentUser
  };
};

export default class UserList extends Component {

  constructor() {
    super();

    this.state = getUserData();
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    UserStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(getUserData());
  }

  render() {
    const users = this.state.users
      .filter((user) => this.state.user.cid !== user.cid)
      .map((user) => <UserListItem key={user.cid} user={user}/>);

    return (
      <div className="row">
        <div className="twelve columns">
          <ul>{users}</ul>
        </div>
      </div>
    );
  }
}
