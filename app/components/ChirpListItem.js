import React from 'react';
import { Link } from 'react-router';

import { avatar } from '../utils';
import DisplayBox from './DisplayBox';
import UserStore from '../stores/users';
import storeBind from '../mixins/store-bind';

const getState      = (props) => ({user: UserStore.get(props.chirp.userId)});
const ChirpListItem = (props) => {
  const chirp = props.chirp;
  // user might be loading white the page is rendered
  const user = props.user || {};

  return (
    <DisplayBox user={user} timestamp={chirp.$created}>
      {chirp.text}
    </DisplayBox>
  );
};

ChirpListItem.propTypes = {
  chirp: React.PropTypes.object.isRequired
};

export default storeBind(ChirpListItem, [UserStore], getState);
