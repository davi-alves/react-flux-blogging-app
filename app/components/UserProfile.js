import moment from 'moment';
import React, { Component } from 'react';

import UserStore from '../stores/users';
import ChirpStore from '../stores/chirps';
import FollowButton from './FollowButton';
import { avatar } from '../utils';

const getState = function (id) {
  id = parseInt(id, 10);

  return {
    user: UserStore.get(id),
    chirps: ChirpStore.byUserId(id),
  };
};

export default class UserProfile extends Component {

  constructor(props) {
    super(props);

    this.state = getState(props.params.id);
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    UserStore.addChangeListener(this._onChange);
    ChirpStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
    ChirpStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(getState(this.props.params.id));
  }

  render() {
    const user = this.state.user || {};
    const chirps = this.state.chirps.map((item) => (
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
  }
}
