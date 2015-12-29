import React from 'react';

import ChirpListItem from './ChirpListItem';

const ChirpList = (props) => {
  const chirps = props.chirps.map((item) => <ChirpListItem key={item.cid} chirp={item}/>);

  return (
    <div className="row">
      <div className="twelve columns">
        {chirps}
      </div>
    </div>
  );
};

ChirpList.propTypes = {
  chirps: React.PropTypes.array.isRequired
};

export default ChirpList;
