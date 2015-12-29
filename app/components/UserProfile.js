import React from 'react';

import UserStore from '../stores/users';
import ChirpStore from '../stores/chirps';
import FollowButton from './FollowButton';
import { avatar } from '../utils';
import storeBind from '../mixins/store-bind';

const getState = function (props) {
  let id = parseInt(props.params.id, 10);

  return {
    user: UserStore.get(id),
    chirps: ChirpStore.byUserId(id),
  };
};

const UserProfile = (props) => {
  const user   = props.user || {};
  const chirps = props.chirps.map((item) => (
    <li key={item.cid}>
      <span className="faded">
        {`${moment(item.$created).fromNow()} ${String.fromCharCode(8226)} `}
      </span>
      {item.text}
    </li>
  ));

  return (
    <div>
      <img src={avatar(user.email)} alt={user.name} className="two columns profile-img"/>
      <div className="ten columns profile-data">
        <h1>{user.name}</h1>
        <h3 className="faded">@{user.username}</h3>
        <p>
          <FollowButton user={user}/>
        </p>
        <ul>{chirps}</ul>
      </div>
    </div>
  );
};

export default storeBind(UserProfile, [ChirpStore, UserStore], getState);
