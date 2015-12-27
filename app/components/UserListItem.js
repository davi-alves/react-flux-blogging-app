import _ from 'lodash';
import React, { Component } from 'react';

import DisplayBox from './DisplayBox';
import FollowButton from './FollowButton';
import UserStore from '../stores/users';

export default class UserListItem extends Component {
  constructor(props) {
    super(props);

    this.onClickFollow = this.onClickFollow.bind(this);
  }

  onClickFollow() {
    console.log('clicked');
  }

  render() {
    const user = this.props.user;
    const following = _.includes(user.following, UserStore.currentUser().cid);

    return (
      <DisplayBox user={user}>
        <FollowButton following={following} toggle={this.onClickFollow}/>
      </DisplayBox>
    );
  }
}

UserListItem.propTypes = {
  user: React.PropTypes.object.isRequired
};
