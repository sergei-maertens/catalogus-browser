import React from 'react';

import { CopyUrl } from './CopyUrl';
import { CatalogusType } from './prop-types';
import KeyValue from './KeyValue';


const CatalogusDetails = ({catalogus}) => {
    return (
      <article className="catalogus-details">
        <div>
          <CopyUrl url={catalogus.url} />
        </div>

        <KeyValue label="Contactpersoon">{catalogus.contactpersoonBeheerNaam}</KeyValue>
        <KeyValue label="Telefoon">{catalogus.contactpersoonBeheerTelefoonnummer}</KeyValue>
        <KeyValue label="E-mail">
          <a href={`mailto:${catalogus.contactpersoonBeheerEmailadres}`}>
            {catalogus.contactpersoonBeheerEmailadres}
          </a>
        </KeyValue>
      </article>
    );
};

CatalogusDetails.propTypes = {
    catalogus: CatalogusType.isRequired,
};


export default CatalogusDetails;
