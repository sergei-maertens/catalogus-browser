import React from 'react';
import PropTypes from 'prop-types';


const Catalogus = ({
    url,
    domein,
    rsin,
    contactpersoonBeheerNaam,
    contactpersoonBeheerTelefoonnummer,
    contactpersoonBeheerEmailadres,
    zaaktypen,
    informatieobjecttypen,
    besluittypen,
}) => {
    return (
        <article className="catalogus">
            <h2>{domein} - {rsin}</h2>
            <div>URL: <code>{url}</code></div>
            <address>
                Contact: {contactpersoonBeheerNaam} (tel: {contactpersoonBeheerTelefoonnummer} - {contactpersoonBeheerEmailadres})
            </address>
        </article>
    );
};

Catalogus.propTypes = {
    url: PropTypes.string.isRequired,
    domein: PropTypes.string.isRequired,
    rsin: PropTypes.string.isRequired,
    contactpersoonBeheerNaam: PropTypes.string.isRequired,
    contactpersoonBeheerTelefoonnummer: PropTypes.string.isRequired,
    contactpersoonBeheerEmailadres: PropTypes.string.isRequired,
    zaaktypen: PropTypes.arrayOf(PropTypes.string).isRequired,
    informatieobjecttypen: PropTypes.arrayOf(PropTypes.string).isRequired,
    besluittypen: PropTypes.arrayOf(PropTypes.string).isRequired,
};


export { Catalogus };
