import React from 'react';
import PropTypes from 'prop-types';


const SidePanel = ({ render }) => {
    const rendered = render ? (render.call ? render.call() : render)
                            : null;
    return (
        <div style={{ width: '60%', marginLeft: '20px'}}>
            { rendered }
        </div>
    );
};

SidePanel.propTypes = {
    render: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]),
};


export { SidePanel };
