import React, { Component } from 'react';

import ChirpListItem from './ChirpListItem';

export default class ChirpList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const chirps = this.props.chirps.map((item) => <ChirpListItem key={item.cid} chirp={item}/>);

    return (
      <div className="row">
        <div className="twelve columns">
          {chirps}
        </div>
      </div>
    );
  }
}

ChirpList.propTypes = {
  chirps: React.PropTypes.array.isRequired
};
