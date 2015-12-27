import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ChirpStore from '../stores/chirps';
import ChirpInput from './ChirpInput';
import ChirpList from './ChirpList';
import actions from '../actions';

const getChips = function () {
  return {
    chirps: ChirpStore.all()
  };
};

export default class Home extends Component {

  constructor() {
    super();

    this.state = getChips();
    this.saveChirp = this.saveChirp.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  saveChirp(val) {
    actions.chirp(val);
  }

  componentWillMount() {
    ChirpStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    ChirpStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(getChips());
  }

  render() {
    return (
      <div>
        <ChirpInput onSave={this.saveChirp}/>
        <ChirpList chirps={this.state.chirps}/>
      </div>
    );
  }
}
