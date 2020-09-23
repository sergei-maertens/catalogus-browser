import React from 'react';
import PropTypes from 'prop-types';

import { CopyUrl } from './CopyUrl';


const Eigenschap = ({ url, naam, definitie, specificatie, toelichting }) => {
    return (
        <article>
            <header>
                { naam }
            </header>
            <div>
                <CopyUrl url={url} />
            </div>
            <p>{toelichting}</p>
            <div style={{overflow: 'auto'}}>
                <code>{JSON.stringify(specificatie)}</code>
            </div>
        </article>
    );
};

Eigenschap.propTypes = {
    url: PropTypes.string.isRequired,
    naam: PropTypes.string.isRequired,
    definitie: PropTypes.string.isRequired,
    specificatie: PropTypes.object.isRequired,
    toelichting: PropTypes.string.isRequired,
};


export { Eigenschap };
