import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ChirpInput extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    let val = ReactDOM.findDOMNode(this.refs.chirpInput).value;
    this.props.onSave.call(null, val);
    ReactDOM.findDOMNode(this.refs.chirpInput).value = '';
  }

  render() {
    return (
      <div className="row">
        <div className="nine columns">
          <input type="text" className="u-full-width" placeholder="Say something..."
            ref="chirpInput"
            onChange={this.handleChange}/>
        </div>
        <div className="three columns">
          <button className="button-primary u-full-width"
            onClick={this.handleClick}>Chirp</button>
        </div>
      </div>
    );
  }
}

ChirpInput.propTypes = {
  onSave: React.PropTypes.func.isRequired
};
