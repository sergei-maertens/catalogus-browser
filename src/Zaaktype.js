import React from 'react';
import PropTypes from 'prop-types';


const Zaaktype = ({ versions }) => {
    return (
        <article style={{marginTop: '2rem'}}>
            <header>
                {versions[0].omschrijving} - {versions[0].identificatie}
            </header>
            <div>
                {versions.length - 1} other versions
            </div>
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
            eindeGeldigheid: PropTypes.string.isRequired,
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
