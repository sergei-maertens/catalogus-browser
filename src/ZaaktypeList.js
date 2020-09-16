import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useAsync } from 'react-use';

import { ClientContext } from './Context';
import { groupBy } from './Utils';


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
        <ul>
            { [...state.value.entries()].map(([omschrijving, versions]) => (
                <li key={versions[0].identificatie}>
                    {`${omschrijving} - ${versions[0].identificatie} (${versions.length} versie(s))`}
                </li>
            )) }
        </ul>
    );
};

ZaaktypeList.propTypes = {
    catalogusUrl: PropTypes.string.isRequired,
};


export { ZaaktypeList };
