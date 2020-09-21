import React from 'react';
import PropTypes from 'prop-types';

import { CopyUrl } from './CopyUrl';


const ZaaktypeVersion = ({
    url,
    versiedatum,
    beginGeldigheid,
    eindeGeldigheid,
    omschrijving,
    concept,
    statustypen,
    resultaattypen,
}) => {
    return (
        <article>
            <header>
                <h3>{omschrijving} - {versiedatum}</h3>
                <div>URL: <CopyUrl url={url} /></div>
                <div>Geldig van: <time>{beginGeldigheid}</time></div>
                <div>Geldig tot: <time>{eindeGeldigheid ?? '-'}</time></div>
            </header>

            <div>Concept? { concept ? 'Ja': 'Nee' }</div>

            <section>
                <strong>Statustypen</strong>
                <ul>
                    { statustypen.map( statustypeUrl => (
                        <li key={statustypeUrl}>{statustypeUrl}</li>
                    ) ) }
                </ul>
            </section>

            <section>
                <strong>Resultaattypen</strong>
                <ul>
                    { resultaattypen.map( resultaattypeUrl => (
                        <li key={resultaattypeUrl}>{resultaattypeUrl}</li>
                    ) ) }
                </ul>
            </section>
        </article>
    );
};

ZaaktypeVersion.propTypes = {
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
    resultaattypen: PropTypes.arrayOf(PropTypes.string).isRequired,
};


const Zaaktype = ({ versions, setRenderSidePanel }) => {
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
                            <li key={version.url} style={{marginBottom: '10px'}}>
                                Versie: {version.versiedatum}
                                <div
                                    onClick={ event => setRenderSidePanel( () => <ZaaktypeVersion {...version} /> ) }
                                    style={{textDecoration: 'underline', cursor: 'pointer'}}
                                >
                                    Toon details
                                </div>
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
            resultaattypen: PropTypes.arrayOf(PropTypes.string).isRequired,
        }).isRequired,
    ).isRequired,
    setRenderSidePanel: PropTypes.func.isRequired,
};


export { Zaaktype };
