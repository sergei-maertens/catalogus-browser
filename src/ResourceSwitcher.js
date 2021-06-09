import React from 'react';
import PropTypes from 'prop-types';


const ResourceSwitcher = ({ name, options, onChange }) => (
  <div style={{display: 'flex', marginTop: '1em', marginBottom: '.5em'}}>
    Resource:&nbsp;
    {
      options.map( ({value, label, selected, disabled}) => (
        <label key={value}>
          <input
            type="radio"
            name={name}
            checked={selected}
            disabled={disabled}
            value={value}
            onChange={onChange}
          />
          {label}
        </label>
      ) )
    }
  </div>
);

ResourceSwitcher.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
  })),
  onChange: PropTypes.func.isRequired,
};


export default ResourceSwitcher;
