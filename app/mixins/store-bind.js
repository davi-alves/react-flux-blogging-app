import React, { Component } from 'react';

export default (InnerComponent, stores, stateCallback) => class extends Component {
    constructor(props) {
      super(props);

      this.state = stateCallback(props);
      this._onChange = this._onChange.bind(this);
    }

    componentWillMount() {
      stores.forEach((store) => store.addChangeListener(this._onChange));
    }

    componentWillUnmount() {
      stores.forEach((store) => store.removeChangeListener(this._onChange));
    }

    _onChange() {
      this.setState(stateCallback(this.props));
    }

    render() {
      return <InnerComponent {...this.state} {...this.props}/>;
    }
};
