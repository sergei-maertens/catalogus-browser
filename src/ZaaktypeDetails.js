import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import useAsync from 'react-use/esm/useAsync';

import CopyUrl from './CopyUrl';
import { ClientContext } from './Context';
import { FetchState } from './FetchState';
import KeyValue from './KeyValue';
import DateDisplay from './DateDisplay';
import DurationDisplay from './DurationDisplay';
import ZaaktypeChildren from './ZaaktypeChildren';
import StatusTypeList from './StatusTypeList';
import ResultaatTypeList from './ResultaatTypeList';

const ZaaktypeDisplay = ({ zaaktype }) => (
  <article className="zaaktype">
    <header className="zaaktype__header">
      <h1 className="zaaktype__title">
        {zaaktype.omschrijving}
        <span className="zaaktype__title-addendum"> ({zaaktype.identificatie})</span>
      </h1>

      <p> API URL: <CopyUrl url={zaaktype.url} /> </p>

      <p>{zaaktype.toelichting}</p>

      <section>

        <div className="zaaktype__meta">
          <div className="zaaktype__meta-title">Behandeling</div>
          <KeyValue label="Doel">{zaaktype.doel}</KeyValue>
          <KeyValue label="Aanleiding">{zaaktype.aanleiding}</KeyValue>
          <KeyValue label="Initiator">{zaaktype.handelingInitiator} {zaaktype.onderwerp.toLowerCase()}</KeyValue>
          <KeyValue label="Behandelaar">{zaaktype.handelingBehandelaar} {zaaktype.onderwerp.toLowerCase()}</KeyValue>
          <KeyValue label="Doorlooptijd"><DurationDisplay duration={zaaktype.doorlooptijd} /></KeyValue>
          <KeyValue label="Servicenorm">{ zaaktype.serviceNorm ? <DurationDisplay duration={zaaktype.serviceNorm} /> : '-' }</KeyValue>
        </div>

        <div className="zaaktype__meta">
          <KeyValue label="Omschrijving generiek">{zaaktype.omschrijvingGeneriek}</KeyValue>
          <KeyValue label="Versie">
            <DateDisplay date={zaaktype.versiedatum} />
          </KeyValue>
          <KeyValue label="Geldig vanaf">
            <DateDisplay date={zaaktype.beginGeldigheid} />
          </KeyValue>
          <KeyValue label="Geldig tot">
            {zaaktype.eindeGeldigheid ? <DateDisplay date={zaaktype.eindeGeldigheid} /> : '-'}
          </KeyValue>
        </div>

        <div className="zaaktype__meta">
          <KeyValue label="Verlenging mogelijk?">{zaaktype.verlengingMogelijk ? 'Ja' : 'Nee'}</KeyValue>
          { zaaktype.verlengingMogelijk ? <KeyValue label="Verlengingstermijn"><DurationDisplay duration={zaaktype.verlengingstermijn} /></KeyValue> : null }
          <KeyValue label="Opschorting en aanhouding mogelijk?">{zaaktype.opschortingEnAanhoudingMogelijk ? 'Ja' : 'Nee'}</KeyValue>
        </div>
      </section>

    </header>

    <ZaaktypeChildren element="statustypen" title="Statustypen">
      <StatusTypeList statustypen={zaaktype.statustypen} />
    </ZaaktypeChildren>

    <ZaaktypeChildren element="resultaattypen" title="Resultaattypen">
      <ResultaatTypeList resultaattypen={zaaktype.resultaattypen} />
    </ZaaktypeChildren>

    <ZaaktypeChildren element="roltypen" title="Roltypen">
    </ZaaktypeChildren>

    <ZaaktypeChildren element="eigenschappen" title="Eigenschappen">
    </ZaaktypeChildren>

  </article>
);


ZaaktypeDisplay.propTypes = {
  zaaktype: PropTypes.shape({
    url: PropTypes.string.isRequired,
    omschrijving: PropTypes.string.isRequired,
    omschrijvingGeneriek: PropTypes.string.isRequired,
    identificatie: PropTypes.string.isRequired,
    toelichting: PropTypes.string.isRequired,
    aanleiding: PropTypes.string.isRequired,
    doel: PropTypes.string.isRequired,
    beginGeldigheid: PropTypes.string.isRequired,
    eindeGeldigheid: PropTypes.string,
    catalogus: PropTypes.string.isRequired,
    concept: PropTypes.bool.isRequired,
    doorlooptijd: PropTypes.string.isRequired,
    handelingBehandelaar: PropTypes.string.isRequired,
    handelingInitiator: PropTypes.string.isRequired,
    onderwerp: PropTypes.string.isRequired,
    indicatieInternOfExtern: PropTypes.oneOf(['intern', 'extern']).isRequired,
    opschortingEnAanhoudingMogelijk: PropTypes.bool.isRequired,
    publicatieIndicatie: PropTypes.bool.isRequired,
    publicatietekst: PropTypes.string.isRequired,
    besluittypen: PropTypes.arrayOf(PropTypes.string).isRequired,
    eigenschappen: PropTypes.arrayOf(PropTypes.object).isRequired,
    gerelateerdeZaaktypen: PropTypes.arrayOf(PropTypes.string).isRequired,
    informatieobjecttypen: PropTypes.arrayOf(PropTypes.string).isRequired,
    resultaattypen: PropTypes.arrayOf(PropTypes.object).isRequired,
    roltypen: PropTypes.arrayOf(PropTypes.object).isRequired,
    statustypen: PropTypes.arrayOf(PropTypes.object).isRequired,
    trefwoorden: PropTypes.arrayOf(PropTypes.string).isRequired,
    productenOfDiensten: PropTypes.arrayOf(PropTypes.string).isRequired,
    referentieProces: PropTypes.object,
    selectielijstProcestype: PropTypes.string.isRequired,
    serviceNorm: PropTypes.string,
    verantwoordingsrelatie: PropTypes.array,
    verlengingMogelijk: PropTypes.bool.isRequired,
    verlengingstermijn: PropTypes.string,
    versiedatum: PropTypes.string.isRequired,
    vertrouwelijkheidaanduiding: PropTypes.string,  // TODO: enum
  }).isRequired,
};


const ZaaktypeDetails = () => {
  const { uuid } = useParams();
  const client = useContext(ClientContext);

  const state = useAsync(
    async () => {
      const zaaktype = await client.get(`zaaktypen/${uuid}`);

      // fetch related resources
      const query = {zaaktype: zaaktype.url, status: 'alles'};
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

      // assign resolved types
      zaaktype.statustypen = statustypen;
      zaaktype.resultaattypen = resultaattypen;
      zaaktype.roltypen = roltypen;
      zaaktype.eigenschappen = eigenschappen;

      // finally, return the resolved object
      return zaaktype;
    },
    [uuid]
  );

  return (
    <FetchState {...state} render={ zaaktype => (
      <ZaaktypeDisplay zaaktype={zaaktype} />
    ) } />
  );
};

ZaaktypeDetails.propTypes = {
};


export default ZaaktypeDetails;
