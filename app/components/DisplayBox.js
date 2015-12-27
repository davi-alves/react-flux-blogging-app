import moment from 'moment';
import React from 'react';
import { Link } from 'react-router';

import { avatar } from '../utils';

const DisplayBox = (props) => {
  const user = props.user;
  const timestamp = props.timestamp ?
    ` ${String.fromCharCode(8226)} ${moment(props.timestamp).fromNow()}` : '';

  return (
    <li className="row chirp">
      <Link className="two columns" to={`/user/${user.cid}`}>
        <img src={avatar(user.email)} alt={user.name}/>
      </Link>
      <div className="ten columns">
        <p>
          <strong>{user.name}</strong>
          <span className="timestamp">
            &nbsp;@{user.username} {timestamp}
          </span>
        </p>
        <p>{props.children}</p>
      </div>
    </li>
  );
};

DisplayBox.propTypes = {
  user: React.PropTypes.object.isRequired,
  timestamp: React.PropTypes.string
};

export default DisplayBox;
