import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { groupBy } from './Utils';

import './styles/ZaaktypeList.scss';


const Zaaktype = ({omschrijving, versions, onClick}) => {
  const [versionsVisible, setVersionsVisible] = useState(false);
  const toggleVersions = () => setVersionsVisible(!versionsVisible);

  const currentZaaktype = null;

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



const ZaaktypeList = ({ items=[] }) => {
  const groups = groupBy(items, zt => zt.omschrijving);

  const onClick = console.log;

  return (
    <nav className="zaaktype-list">
      <ul className="zaaktype-list__zaaktypen">
        {
          [...groups.entries()].map( ([omschrijving, versions]) => (
            <li key={omschrijving} className="zaaktype-list__zaaktype">
              <Zaaktype omschrijving={omschrijving} versions={versions} onClick={onClick} />
            </li>
          ) )
        }
      </ul>
    </nav>
  );
};

ZaaktypeList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    aanleiding: PropTypes.string.isRequired,
    doel: PropTypes.string.isRequired,
    beginGeldigheid: PropTypes.string.isRequired,
    eindeGeldigheid: PropTypes.string,
    catalogus: PropTypes.string.isRequired,
    omschrijving: PropTypes.string.isRequired,
    identificatie: PropTypes.string.isRequired,
  })),
};


export default ZaaktypeList;
