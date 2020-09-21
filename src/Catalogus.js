import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { CopyUrl } from './CopyUrl';
import { ZaaktypeList } from './ZaaktypeList';


const Catalogus = ({
    setRenderSidePanel,
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
            <div>URL: <CopyUrl url={url} /></div>
            <address>
                Contact: {contactpersoonBeheerNaam} (tel: {contactpersoonBeheerTelefoonnummer} - {contactpersoonBeheerEmailadres})
            </address>

            <Tabs>
                <TabList>
                    <Tab>Zaaktypen</Tab>
                    <Tab>Informatieobjecttypen ({ informatieobjecttypen.length })</Tab>
                    <Tab>Besluittypen ({ besluittypen.length })</Tab>
                </TabList>

                <TabPanel>
                    <ZaaktypeList catalogusUrl={url} setRenderSidePanel={setRenderSidePanel} />
                </TabPanel>
                <TabPanel> iot </TabPanel>
                <TabPanel> bt </TabPanel>

            </Tabs>

        </article>
    );
};

Catalogus.propTypes = {
    setRenderSidePanel: PropTypes.func.isRequired,
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
