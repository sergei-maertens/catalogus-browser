import React from 'react';
import PropTypes from 'prop-types';
import {FormattedDate} from 'react-intl';


const DateDisplay = ({ date }) => {
    return (
      <time className="date" value={date}>
        <FormattedDate value={date} year="numeric" month="long" day="numeric" />
      </time>
    );
};

DateDisplay.propTypes = {
    date: PropTypes.string.isRequired,
};


export default DateDisplay;
