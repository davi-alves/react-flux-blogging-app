import React from 'react';

import actions from '../actions';
import ChirpStore from '../stores/chirps';
import ChirpInput from './ChirpInput';
import ChirpList from './ChirpList';
import storeBind from '../mixins/store-bind';

const getState = () => ({ chirps: ChirpStore.timeline() });
const Home = (props) => {
  return (
    <div>
      <ChirpInput onSave={actions.chirp}/>
      <ChirpList chirps={props.chirps}/>
    </div>
  );
};

export default storeBind(Home, [ChirpStore], getState);
