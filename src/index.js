import React, { Component, PropTypes } from 'react';

const propTypes = {};

class YourComponent extends Component {
  state = {}

  render () {
    return (
      <div className="YourComponent-class">
        Your Component as npm package
      </div>
    );
  }
}

YourComponent.propTypes = propTypes;

export default YourComponent;
