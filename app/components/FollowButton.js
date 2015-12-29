import _ from 'lodash';
import React from 'react';

import UserStore from '../stores/users';
import actions from '../actions';
import storeBind from '../mixins/store-bind';

const getState = function (props) {
  let currentUser = UserStore.currentUser;

  return {
    currentUser: currentUser,
    following: currentUser.following
  };
};

const isFallowing = (props) =>
  _.contains(props.following, props.user.cid);

const toggleFollow = function(props) {
  return function () {
    let cid = props.user.cid;

    if (isFallowing(props)) {
      actions.unfollow(cid);
    } else {
      actions.follow(cid);
    }
  };
};

const FollowButton = (props) => {
  if (props.currentUser.cid === props.user.cid) {
    return null;
  }

  let isFollowing = isFallowing(props);
  let buttonClass = !isFollowing ? 'button-primary' : '';

  return (
    <button className={buttonClass} onClick={toggleFollow(props)}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

FollowButton.propTypes = {
  user: React.PropTypes.object.isRequired
};

export default storeBind(FollowButton, [UserStore], getState);
