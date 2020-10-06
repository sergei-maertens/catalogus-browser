import React, { useContext } from 'react';
import { useAsync } from 'react-use';

import { ClientContext, CatalogusContext } from './Context';
import { groupBy } from './Utils';
import { FetchState } from './FetchState';

import './styles/ZaaktypeList.scss';


const ZaaktypeList = () => {
  const client = useContext(ClientContext);
  const catalogus = useContext(CatalogusContext);

  const state = useAsync(async () => {
    if (!catalogus) {
      return new Map();
    }

    const zaaktypen = await client.getPaginated(
        `zaaktypen?catalogus=${catalogus.url}&status=alles`
    );
    const grouped = groupBy(zaaktypen, zt => zt.omschrijving);
    return grouped;
  }, [client.configState, catalogus]);

  return (
    <FetchState {...state} render={ (groups) => (
      <nav className="zaaktype-list">
        <ul>
          {
            [...groups.entries()].map( ([omschrijving, versions]) => (
              <li key={omschrijving}>{omschrijving}</li>
            ) )
          }
        </ul>
      </nav>
    )} />
  );
};

ZaaktypeList.propTypes = {
};


export default ZaaktypeList;
