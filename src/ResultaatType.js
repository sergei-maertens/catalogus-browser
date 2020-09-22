import React from 'react';
import PropTypes from 'prop-types';

import { CopyUrl } from './CopyUrl';


const ResultaatType = ({ url, omschrijving }) => {
    return (
        <article>
            <header>
                { omschrijving }
            </header>
            <div>
                <CopyUrl url={url} />
            </div>
        </article>
    );
};

ResultaatType.propTypes = {
    url: PropTypes.string.isRequired,
    omschrijving: PropTypes.string.isRequired,
};


export { ResultaatType };
