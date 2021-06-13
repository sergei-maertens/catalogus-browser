import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useRouteMatch, Link } from 'react-router-dom';

import { groupBy, UUIDFromUrl } from './Utils';

import './styles/ZaaktypeList.scss';


const Zaaktype = ({omschrijving, versions}) => {
  const outerMatch = useRouteMatch();
  const { params: { uuid } } = useRouteMatch(`${outerMatch.path}/zaaktypen/:uuid`);

  const [versionsVisible, setVersionsVisible] = useState(false);
  const toggleVersions = () => setVersionsVisible(!versionsVisible);

  return (
    <>
      <span
        className="zaaktype-list__omschrijving"
        title={omschrijving}
        onClick={toggleVersions}>
        > [{versions[0].identificatie}] {omschrijving}
      </span>
      {
        versionsVisible
          ? (
            <ul className="zaaktype-list__versions">
              {versions.map(version => (
                <li key={version.url}>
                  <Link
                    to={`${outerMatch.url}/zaaktypen/${UUIDFromUrl(version.url)}`}
                    className={classnames(
                      'zaaktype-list__version',
                      {'zaaktype-list__version--active': UUIDFromUrl(version.url) === uuid}
                    )}
                  >
                    {version.versiedatum}
                  </Link>
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
