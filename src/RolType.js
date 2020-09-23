import React from 'react';
import PropTypes from 'prop-types';

import { CopyUrl } from './CopyUrl';


const RolType = ({ url, omschrijving, omschrijvingGeneriek }) => {
    return (
        <article>
            <header>
                { omschrijving }
            </header>
            <div>
                <CopyUrl url={url} />
            </div>
            <p> Generiek: {omschrijvingGeneriek} </p>
        </article>
    );
};

RolType.propTypes = {
    url: PropTypes.string.isRequired,
    omschrijving: PropTypes.string.isRequired,
    omschrijvingGeneriek: PropTypes.string.isRequired,
};


export { RolType };
