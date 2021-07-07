import React from 'react';
import PropTypes from 'prop-types';


const DurationDisplay = ({ duration }) => {
  return (
    <>{duration}</>
  );
};

DurationDisplay.propTypes = {
  duration: PropTypes.string.isRequired, // iso8601 duration string
};


export default DurationDisplay;
