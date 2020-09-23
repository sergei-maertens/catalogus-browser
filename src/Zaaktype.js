import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useAsync } from 'react-use';

import { ClientContext } from './Context';
import { CopyUrl } from './CopyUrl';
import { FetchState } from './FetchState';
import { StatusType } from './StatusType';
import { ResultaatType } from './ResultaatType';
import { RolType } from './RolType';
import { Eigenschap } from './Eigenschap';


const RelatedObjects = ({ title, objects, component }) => {
    return (
        <section>
            <strong>{title}</strong>
            <ul>
                { objects.map( obj => (
                    <li key={obj.url}>
                        { React.createElement(component, obj) }
                    </li>
                ) ) }
            </ul>
        </section>
    );
};

RelatedObjects.propTypes = {
    title: PropTypes.string.isRequired,
    objects: PropTypes.array.isRequired,
    component: PropTypes.func.isRequired,
};


const ZaaktypeVersion = ({
    url,
    versiedatum,
    beginGeldigheid,
    eindeGeldigheid,
    omschrijving,
    concept,
}) => {

    const client = useContext(ClientContext);

    // fetch related objects inside zaaktype

    const state = useAsync(async () => {
        const query = {zaaktype: url, status: 'alles'};
        const fetchStatustypen = client.getPaginated('statustypen', query);
        const fetchResultaattypen = client.getPaginated('resultaattypen', query);
        const fetchRoltypen = client.getPaginated('roltypen', query);
        const fetchEigenschappen = client.getPaginated('eigenschappen', query);

        const [statustypen, resultaattypen, roltypen, eigenschappen] = await Promise.all([
            fetchStatustypen,
            fetchResultaattypen,
            fetchRoltypen,
            fetchEigenschappen,
        ]);
        statustypen.sort( (st1, st2) => st1.volgnummer - st2.volgnummer );
        return {
            statustypen,
            resultaattypen,
            roltypen,
            eigenschappen,
        };
    }, [url]);

    return (
        <FetchState {...state} render={ ({ statustypen, resultaattypen, roltypen, eigenschappen }) => (
            <article>
                <header>
                    <h3>{omschrijving} - {versiedatum}</h3>
                    <div>URL: <CopyUrl url={url} /></div>
                    <div>Geldig van: <time>{beginGeldigheid}</time></div>
                    <div>Geldig tot: <time>{eindeGeldigheid ?? '-'}</time></div>
                </header>

                <div>Concept? { concept ? 'Ja': 'Nee' }</div>

                <RelatedObjects title="Statustypen" objects={statustypen} component={StatusType} />
                <RelatedObjects title="Resultaattypen" objects={resultaattypen} component={ResultaatType} />
                <RelatedObjects title="Roltypen" objects={roltypen} component={RolType} />
                <RelatedObjects title="Eigenschappen" objects={eigenschappen} component={Eigenschap} />
            </article>
        ) } />
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
