import React from 'react';

const FollowButton = (props) => {
  const buttonClass = !props.following ? 'button-primary' : '';

  return (
    <button className={buttonClass} onClick={props.toggle}>
      {props.following ? 'Unfollow' : 'Follow'}
    </button>
  );
};

FollowButton.propTypes = {
  following: React.PropTypes.bool.isRequired,
  toggle: React.PropTypes.func.isRequired
};

export default FollowButton;
