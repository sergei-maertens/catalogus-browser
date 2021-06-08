import React from 'react';

import { CopyUrl } from './CopyUrl';
import { CatalogusType } from './prop-types';
import KeyValue from './KeyValue';


const CatalogusDetails = ({}) => {
    return <div>Catalogus details</div>;


    // return (
    //   <article className="catalogus-details" style={{width: '100%', background: '#eeeeee', padding: '.5em'}}>
    //     <div>
    //       <CopyUrl url={catalogus.url} />
    //     </div>

    //     <div style={{display: 'flex', justifyContent: 'space-between'}}>
    //       <KeyValue label="Contactpersoon">{catalogus.contactpersoonBeheerNaam}</KeyValue>
    //       <KeyValue label="Telefoon">{catalogus.contactpersoonBeheerTelefoonnummer}</KeyValue>
    //       <KeyValue label="E-mail">
    //         <a href={`mailto:${catalogus.contactpersoonBeheerEmailadres}`}>
    //           {catalogus.contactpersoonBeheerEmailadres}
    //         </a>
    //       </KeyValue>
    //     </div>
    //   </article>
    // );
};

CatalogusDetails.propTypes = {
};


export default CatalogusDetails;
