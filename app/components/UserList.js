import React from 'react';

import UserStore from '../stores/users';
import UserListItem from './UserListItem';
import storeBind from '../mixins/store-bind';

const getState = () => ({
  users: UserStore.all(),
  user: UserStore.currentUser
});
const UserList = (props) => {
  const users = props.users
    .filter((user) => props.user.cid !== user.cid)
    .map((user) => <UserListItem key={user.cid} user={user}/>);

  return (
    <div className="row">
      <div className="twelve columns">
        <ul>{users}</ul>
      </div>
    </div>
  );
};

export default storeBind(UserList, [UserStore], getState);
