import React from 'react';
import PropTypes from 'prop-types';

import { CopyUrl } from './CopyUrl';


const ResultaatType = ({
    url,
    omschrijving,
    selectielijstklasse,
    toelichting,
    archiefnominatie,
    archiefactietermijn,
    brondatumArchiefprocedure,
}) => {
    return (
        <article>
            <header>
                { omschrijving }
            </header>
            <div>
                <CopyUrl url={url} />
            </div>
            <section>
                <div>Archivering</div>
                <p>
                    Archiefnominatie: {archiefnominatie}
                    <br />
                    Archiefactietermijn: {archiefactietermijn}
                </p>
                <div style={{overflow: 'auto'}}>
                    <code>{JSON.stringify(brondatumArchiefprocedure)}</code>
                </div>
            </section>

        </article>
    );
};

ResultaatType.propTypes = {
    url: PropTypes.string.isRequired,
    omschrijving: PropTypes.string.isRequired,
    selectielijstklasse: PropTypes.string.isRequired,
    toelichting: PropTypes.string.isRequired,
    archiefnominatie: PropTypes.string.isRequired,
    archiefactietermijn: PropTypes.string.isRequired,
    brondatumArchiefprocedure: PropTypes.object.isRequired,
};


export { ResultaatType };
