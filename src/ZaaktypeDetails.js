import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import useAsync from 'react-use/esm/useAsync';

import { ClientContext } from './Context';
import { FetchState } from './FetchState';
import KeyValue from './KeyValue';
import DateDisplay from './DateDisplay';
import DurationDisplay from './DurationDisplay';
import StatusTypeList from './StatusTypeList';


const ZaaktypeDisplay = ({ zaaktype }) => (
  <article className="zaaktype">
    <header className="zaaktype__header">
      <h1 className="zaaktype__title">
        {zaaktype.omschrijving}
        <span className="zaaktype__title-addendum"> ({zaaktype.identificatie})</span>
      </h1>

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

    <section className="zaaktype__statustypen">
      <StatusTypeList statustypen={zaaktype.statustypen} />
    </section>


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
    eigenschappen: PropTypes.arrayOf(PropTypes.string).isRequired,
    gerelateerdeZaaktypen: PropTypes.arrayOf(PropTypes.string).isRequired,
    informatieobjecttypen: PropTypes.arrayOf(PropTypes.string).isRequired,
    resultaattypen: PropTypes.arrayOf(PropTypes.string).isRequired,
    roltypen: PropTypes.arrayOf(PropTypes.string).isRequired,
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


const ZaaktypeDetails = ({ foo }) => {
  const { uuid } = useParams();
  const client = useContext(ClientContext);

  const state = useAsync(
    async () => {
      const zaaktype = await client.get(`zaaktypen/${uuid}`);
      zaaktype.statustypen = await client.getPaginated(
        `statustypen`,
        {zaaktype: zaaktype.url, status: 'alles'}
      );
      return zaaktype;
    }
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
