import React, { useContext } from 'react';
import { useAsync } from 'react-use';
// import PropTypes from 'prop-types';

import { ClientContext } from './Context';


const CatalogusList = () => {
    const client = useContext(ClientContext);

    const state = useAsync(async () => {
        const catalogi = await client.get('catalogussen');
        return catalogi;
    }, [client.baseUrl]);


    return (
        <div>{ JSON.stringify(state) }</div>
    );
};

CatalogusList.propTypes = {
};


export { CatalogusList };
