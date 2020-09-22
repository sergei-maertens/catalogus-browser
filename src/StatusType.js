import React from 'react';
import PropTypes from 'prop-types';

import { CopyUrl } from './CopyUrl';


const StatusType = ({ url, omschrijving, isEindstatus, volgnummer }) => {
    return (
        <article>
            <header>
                { `${volgnummer}. ${omschrijving}` }
            </header>
            <div>
                <CopyUrl url={url} />
            </div>
        </article>
    );
};

StatusType.propTypes = {
    url: PropTypes.string.isRequired,
    omschrijving: PropTypes.string.isRequired,
    isEindstatus: PropTypes.bool.isRequired,
    volgnummer: PropTypes.number.isRequired,
};


export { StatusType };
