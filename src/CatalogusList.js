import React, { useContext } from 'react';
import { useAsync } from 'react-use';
// import PropTypes from 'prop-types';

import { ClientContext } from './Context';
import { Catalogus } from './Catalogus';


const CatalogusList = () => {
    const client = useContext(ClientContext);

    const state = useAsync(async () => {
        const catalogi = await client.getPaginated('catalogussen');
        return catalogi;
    }, [client.configState]);

    if (state.loading) {
        return (<div>Loading...</div>);
    }

    return (
        <React.Fragment>
            { state.value.map(cat => <Catalogus key={cat.url} {...cat} />) }
        </React.Fragment>
    );
};

CatalogusList.propTypes = {
};


export { CatalogusList };
