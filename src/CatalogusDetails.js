import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import { CopyUrl } from './CopyUrl';
import { CatalogusType } from './prop-types';
import KeyValue from './KeyValue';


const CatalogusDetails = ({catalogi}) => {
    const { uuid } = useParams();
    const catalogus = catalogi[uuid];

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
      </article>
    );
};

CatalogusDetails.propTypes = {
  catalogi: PropTypes.objectOf(CatalogusType),
};


export default CatalogusDetails;
