import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useAsync } from 'react-use';

import { ClientContext } from './Context';


const ZaaktypeList = ({ catalogusUrl }) => {
    const client = useContext(ClientContext);

    const state = useAsync(async () => {
        const zaaktypen = await client.getPaginated(
            `zaaktypen?catalogus=${catalogusUrl}&status=alles`
        );
        return zaaktypen;
    }, [client.configState]);

    if (state.loading) {
        return (<div>Loading...</div>);
    }

    return (
        <ul>
            { state.value.map(zt => (
                <li key={zt.url}>{zt.omschrijving} - {zt.identificatie}</li>
            )) }
        </ul>
    );
};

ZaaktypeList.propTypes = {
    catalogusUrl: PropTypes.string.isRequired,
};


export { ZaaktypeList };
