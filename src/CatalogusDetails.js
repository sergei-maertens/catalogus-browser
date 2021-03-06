import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import { CopyUrl } from './CopyUrl';
import { CatalogusType } from './prop-types';
import KeyValue from './KeyValue';
import ResourceSwitcher from './ResourceSwitcher';
import ResourceList from './ResourceList';
import ZaaktypeDetails from './ZaaktypeDetails';


const CatalogusDetails = ({catalogi}) => {
    const match = useRouteMatch();
    const [selectedResource, setSelectedResource] = useState('zt');
    const catalogus = catalogi[match.params.catalogusUuid];

    const resourceOptions = [
      {
        value: 'zt',
        label: 'Zaaktypen',
        selected: selectedResource === 'zt',
        disabled: !catalogus.zaaktypen.length
      },
      {
        value: 'iot',
        label: 'Documenttypen',
        selected: selectedResource === 'iot',
        disabled: !catalogus.informatieobjecttypen.length
      },
      {
        value: 'bt',
        label: 'Besluittypen',
        selected: selectedResource === 'bt',
        disabled: !catalogus.besluittypen.length
      },
    ];

    return (
      <article className="catalogus-details" style={{width: '100%', background: '#eeeeee', padding: '.5em'}}>
        <div>
          <CopyUrl url={catalogus.url} />
        </div>

        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <KeyValue label="Contactpersoon">{catalogus.contactpersoonBeheerNaam}</KeyValue>
          <KeyValue label="Telefoon">{catalogus.contactpersoonBeheerTelefoonnummer}</KeyValue>
          <KeyValue label="E-mail">
            <a href={`mailto:${catalogus.contactpersoonBeheerEmailadres}`}>
              {catalogus.contactpersoonBeheerEmailadres}
            </a>
          </KeyValue>
        </div>

        <ResourceSwitcher
          name="resource"
          options={resourceOptions}
          onChange={ ({ target: {value} }) => {setSelectedResource(value)} }
        />

        <section style={{display: 'flex', background: 'white', margin: '-.5em', padding: '1em'}}>
          <ResourceList resource={selectedResource} catalogusUrl={catalogus.url} />

          <Switch>

            <Route path={`${match.path}/zaaktypen/:uuid`}>
              <ZaaktypeDetails />
            </Route>

            <Route path={match.path}>
              <div>Select a resource to view.</div>
            </Route>

          </Switch>

        </section>
      </article>
    );
};

CatalogusDetails.propTypes = {
  catalogi: PropTypes.objectOf(CatalogusType),
};


export default CatalogusDetails;
