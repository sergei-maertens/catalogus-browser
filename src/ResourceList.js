import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useAsync } from 'react-use';

import { ClientContext } from './Context';
import { FetchState } from './FetchState';
import ZaaktypeList from './ZaaktypeList';


const RESOURCE_MAP = {
  zt: 'zaaktypen',
  iot: 'informatieobjecttypen',
  bt: 'besluittypen',
};


const COMPONENT_MAP = {
  zt: ZaaktypeList,
  iot: undefined, // TODO
  bt: undefined, // TODO
};


const ResourceList = ({ resource, catalogusUrl }) => {
  const client = useContext(ClientContext);

  const state = useAsync(
    async () => {
      const items = await client.getPaginated(
        RESOURCE_MAP[resource],
        {
          catalogus: catalogusUrl,
          status: 'alles',
        },
      );
      return items;
    },
    [resource, catalogusUrl]
  );

  const ListComponent = COMPONENT_MAP[resource];

  return (
    <div className="list" style={{width: '30%', marginRight: '1em'}}>
      <FetchState {...state} render={ (items) => (
        <ListComponent items={items} />
      ) } />
    </div>
  );
};

ResourceList.propTypes = {
  resource: PropTypes.oneOf([
    'zt',
    'iot',
    'bt',
  ]).isRequired,
  catalogusUrl: PropTypes.string.isRequired,
};


export default ResourceList;
