import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useAsync } from 'react-use';

import { ClientContext } from './Context';
import { groupBy } from './Utils';
import { Zaaktype } from './Zaaktype';


const ZaaktypeList = ({ catalogusUrl }) => {
    const client = useContext(ClientContext);

    const state = useAsync(async () => {
        const zaaktypen = await client.getPaginated(
            `zaaktypen?catalogus=${catalogusUrl}&status=alles`
        );
        const grouped = groupBy(zaaktypen, zt => zt.omschrijving);
        return grouped;
    }, [client.configState]);

    if (state.loading) {
        return (<div>Loading...</div>);
    }

    return (
        <>
            { [...state.value.entries()].map(([omschrijving, versions]) => (
                <Zaaktype key={omschrijving} versions={versions} />
            )) }
        </>
    );
};

ZaaktypeList.propTypes = {
    catalogusUrl: PropTypes.string.isRequired,
};


export { ZaaktypeList };
