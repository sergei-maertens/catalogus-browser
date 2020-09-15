import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { ZaaktypeList } from './ZaaktypeList';


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
            <div>URL: <code>{url}</code></div>
            <address>
                Contact: {contactpersoonBeheerNaam} (tel: {contactpersoonBeheerTelefoonnummer} - {contactpersoonBeheerEmailadres})
            </address>

            <Tabs>
                <TabList>
                    <Tab>Zaaktypen ({ zaaktypen.length })</Tab>
                    <Tab>Informatieobjecttypen ({ informatieobjecttypen.length })</Tab>
                    <Tab>Besluittypen ({ besluittypen.length })</Tab>
                </TabList>

                <TabPanel>
                    <ZaaktypeList catalogusUrl={url} />
                </TabPanel>
                <TabPanel> iot </TabPanel>
                <TabPanel> bt </TabPanel>

            </Tabs>

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
