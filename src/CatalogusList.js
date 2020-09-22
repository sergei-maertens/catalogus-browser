import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useAsync } from 'react-use';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { ClientContext } from './Context';
import { Catalogus } from './Catalogus';


const CatalogusList = ({ setRenderSidePanel }) => {
    const client = useContext(ClientContext);

    const state = useAsync(async () => {
        const catalogi = await client.getPaginated('catalogussen');
        return catalogi;
    }, [client.configState]);

    if (state.loading) {
        return (<div>Loading...</div>);
    }

    if (state.error) {
        return (<div>{state.error.toString()}</div>);
    }

    return (
        <Tabs>
            <TabList>
                { state.value.map(cat => <Tab key={cat.url}>{cat.domein} - {cat.rsin}</Tab>) }
            </TabList>
            { state.value.map(cat => (
                <TabPanel key={cat.url}>
                    <Catalogus setRenderSidePanel={setRenderSidePanel} {...cat} />
                </TabPanel>
            ) ) }
        </Tabs>
    );
};

CatalogusList.propTypes = {
    setRenderSidePanel: PropTypes.func.isRequired,
};


export { CatalogusList };
