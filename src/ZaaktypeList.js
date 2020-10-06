import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useAsync } from 'react-use';
import classnames from 'classnames';

import { ClientContext, CatalogusContext, ZaaktypeContext } from './Context';
import { groupBy } from './Utils';
import { FetchState } from './FetchState';

import './styles/ZaaktypeList.scss';


const Zaaktype = ({omschrijving, versions, onClick}) => {
  const [versionsVisible, setVersionsVisible] = useState(false);
  const toggleVersions = () => setVersionsVisible(!versionsVisible);

  const currentZaaktype = useContext(ZaaktypeContext);

  return (
    <>
      <span
        className="zaaktype-list__omschrijving"
        title={omschrijving}
        onClick={toggleVersions}>
        > {omschrijving}
      </span>
      {
        versionsVisible
          ? (
            <ul className="zaaktype-list__versions">
              {versions.map(version => (
                <li
                  key={version.url}
                  className={classnames(
                    'zaaktype-list__version',
                    {'zaaktype-list__version--active': version === currentZaaktype}
                  )}
                  onClick={() => onClick(version)}>
                  {version.versiedatum}
                </li>
              ))}
            </ul>
          )
          : null
      }
    </>
  );
};

Zaaktype.propTypes = {
  omschrijving: PropTypes.string.isRequired,
  versions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
};



const ZaaktypeList = ({onZaaktypeSelect}) => {
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
        <ul className="zaaktype-list__zaaktypen">
          {
            [...groups.entries()].map( ([omschrijving, versions]) => (
              <li key={omschrijving} className="zaaktype-list__zaaktype">
                <Zaaktype omschrijving={omschrijving} versions={versions} onClick={onZaaktypeSelect} />
              </li>
            ) )
          }
        </ul>
      </nav>
    )} />
  );
};

ZaaktypeList.propTypes = {
  onZaaktypeSelect: PropTypes.func.isRequired,
};


export default ZaaktypeList;
