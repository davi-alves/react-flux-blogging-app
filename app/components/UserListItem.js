import React from 'react';

import DisplayBox from './DisplayBox';
import FollowButton from './FollowButton';

const UserListItem = (props) => {
  const user = props.user;

  return (
    <DisplayBox user={user}>
      <FollowButton user={user}/>
    </DisplayBox>
  );
};

UserListItem.propTypes = {
  user: React.PropTypes.object.isRequired
};

export default UserListItem;
