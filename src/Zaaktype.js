import React from 'react';
import PropTypes from 'prop-types';

import { CopyUrl } from './CopyUrl';


const Zaaktype = ({ versions }) => {
    return (
        <article style={{marginTop: '2rem'}}>
            <header>
                {versions[0].omschrijving} - {versions[0].identificatie}
            </header>

            <section>
                <strong>Versies</strong>
                <ul>
                    {
                        versions.map( version => (
                            <li key={version.url}>
                                Versie: {version.versiedatum}
                                <br/>
                                {version.beginGeldigheid} - {version.eindeGeldigheid}
                                <br/>
                                URL: <CopyUrl url={version.url} />
                            </li>
                        ) )
                    }
                </ul>
            </section>

        </article>
    );
};

Zaaktype.propTypes = {
    versions: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string.isRequired,
            omschrijving: PropTypes.string.isRequired,
            identificatie: PropTypes.string.isRequired,
            beginGeldigheid: PropTypes.string.isRequired,
            eindeGeldigheid: PropTypes.string,
            versiedatum: PropTypes.string.isRequired,
            concept: PropTypes.bool.isRequired,
            doel: PropTypes.string.isRequired,
            doorlooptijd: PropTypes.string.isRequired,
            onderwerp: PropTypes.string.isRequired,
            selectielijstProcestype: PropTypes.string.isRequired,
            vertrouwelijkheidaanduiding: PropTypes.string.isRequired,
            statustypen: PropTypes.arrayOf(PropTypes.string).isRequired,
        }).isRequired,
    ).isRequired,
};


export { Zaaktype };
