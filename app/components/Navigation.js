import React from 'react';
import { Link } from 'react-router';

import UserStore from '../stores/users';
import storeBind from '../mixins/store-bind';

const getState = () =>({ user: UserStore.currentUser});
const Navigation = (props) => {
  return (
    <ul>
      <li><Link to="/">Timeline</Link></li>
      <li><Link to="/users">Users</Link></li>
      <li><a href="/logout">Logout</a> ({props.user.username})</li>
    </ul>
  );
};

export default storeBind(Navigation, [UserStore], getState);
