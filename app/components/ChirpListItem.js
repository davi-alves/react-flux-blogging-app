import moment from 'moment';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import { avatar } from '../utils';
import DisplayBox from './DisplayBox';
import UserStore from '../stores/users';

export default class ChirpListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: UserStore.get(props.chirp.userId)
    };
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    UserStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      user: UserStore.get(this.props.chirp.userId)
    });
  }

  render() {
    const chirp = this.props.chirp;
    // user might be loading white the page is rendered
    const user = this.state.user || {};

    return (
      <DisplayBox user={user} timestamp={chirp.$created}>
        {chirp.text}
      </DisplayBox>
    );
  }
}

ChirpListItem.propTypes = {
  chirp: React.PropTypes.object.isRequired
};
