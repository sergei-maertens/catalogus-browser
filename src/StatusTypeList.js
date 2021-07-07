import React from 'react';
import PropTypes from 'prop-types';

import './styles/StatusTypeList.scss';


const StatusTypePropTypes = {
  url: PropTypes.string.isRequired,
  omschrijving: PropTypes.string.isRequired,
  omschrijvingGeneriek: PropTypes.string.isRequired,
  statustekst: PropTypes.string.isRequired,
  informeren: PropTypes.bool.isRequired,
  isEindstatus: PropTypes.bool.isRequired,
  zaaktype: PropTypes.string.isRequired,
  volgnummer: PropTypes.number.isRequired,
};


const StatusType = ({ url, omschrijving, omschrijvingGeneriek, statustekst, informeren, isEindstatus, zaaktype, volgnummer }) => (
  <div className="statustype">{omschrijving}</div>
);

StatusType.propTypes = StatusTypePropTypes;


const StatusTypeList = ({ statustypen=[] }) => (
  <ol className="statustype-list">
    {
      statustypen.map(statustype => (
        <li key={statustype.url} volgnummer={statustype.volgnummer}>
          <StatusType {...statustype} />
        </li>
      ))
    }
  </ol>
);

StatusTypeList.propTypes = {
    statustypen: PropTypes.arrayOf(PropTypes.shape(StatusTypePropTypes)),
};


export default StatusTypeList;
