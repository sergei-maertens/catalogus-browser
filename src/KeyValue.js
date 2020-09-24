import React from 'react';
import PropTypes from 'prop-types';

import './styles/KeyValue.scss';


const KeyValue = ({ label, children }) => {
    return (
      <div className="key-value">
        <div className="key-value__label">{label}</div>
        <div className="key-value__value">{children}</div>
      </div>
    );
};

KeyValue.propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};


export default KeyValue;
