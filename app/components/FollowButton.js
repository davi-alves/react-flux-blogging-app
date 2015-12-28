import _ from 'lodash';
import React, { Component } from 'react';

import UserStore from '../stores/users';
import actions from '../actions';

const getState = function () {
  const currentUser = UserStore.currentUser;

  return {
    currentUser: currentUser,
    following: currentUser.following
  };
};

export default class FollowButton extends Component {
  constructor(props) {
    super(props);

    this.state = getState();
    this._onChange = this._onChange.bind(this);
    this._isFallowing = this._isFallowing.bind(this);
    this.toggleFollow = this.toggleFollow.bind(this);
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

  _isFallowing() {
    return _.contains(this.state.following, this.props.user.cid);
  }

  toggleFollow() {
    const cid = this.props.user.cid;

    if (this._isFallowing()) {
      actions.unfollow(cid);
    } else {
      actions.follow(cid);
    }
  }

  render() {
    if (this.state.currentUser.cid === this.props.user.cid) {
      return null;
    }

    const isFollowing = this._isFallowing();
    const buttonClass = !isFollowing ? 'button-primary' : '';

    return (
      <button className={buttonClass} onClick={this.toggleFollow}>
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
    );
  }
}

FollowButton.propTypes = {
  user: React.PropTypes.object.isRequired
};
