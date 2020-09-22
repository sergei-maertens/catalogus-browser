import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useAsync } from 'react-use';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { ClientContext } from './Context';
import { Catalogus } from './Catalogus';
import { FetchState } from './FetchState';


const CatalogusList = ({ setRenderSidePanel }) => {
    const client = useContext(ClientContext);

    const state = useAsync(async () => {
        const catalogi = await client.getPaginated('catalogussen');
        return catalogi;
    }, [client.configState]);

    return (
        <FetchState {...state} render={ (value) => (
            <Tabs>
                <TabList>
                    { value.map(cat => <Tab key={cat.url}>{cat.domein} - {cat.rsin}</Tab>) }
                </TabList>
                { value.map(cat => (
                    <TabPanel key={cat.url}>
                        <Catalogus setRenderSidePanel={setRenderSidePanel} {...cat} />
                    </TabPanel>
                ) ) }
            </Tabs>
        ) } />
    );
};

CatalogusList.propTypes = {
    setRenderSidePanel: PropTypes.func.isRequired,
};


export { CatalogusList };
