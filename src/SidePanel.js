import React from 'react';
import PropTypes from 'prop-types';


const SidePanel = ({ render }) => {
    const rendered = render.call ? render.call() : render;
    return (
        <div style={{ width: '60%', marginLeft: '20px'}}>
            { rendered }
        </div>
    );
};

SidePanel.propTypes = {
    render: PropTypes.func.isRequired,
};


export { SidePanel };
