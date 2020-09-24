import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useAsync } from 'react-use';

import { ClientContext } from './Context';
import { FetchState } from './FetchState';
import { CatalogusType } from './prop-types';

import './styles/CatalogusPicker.scss';


const CatalogusSelect = ({ catalogi, onChange, active }) => {
  const currentValue = active ? active.url : '';

  const onSelectChange = (event) => {
    const catalogusUrl = event.target.value;
    const catalogus = catalogi.find(cat => cat.url === catalogusUrl);
    onChange(catalogus);
  };

  return (
    <select
      name="catalogus"
      onChange={onSelectChange}
      className="catalogus-picker"
      value={currentValue}
    >
      {
        catalogi.map( catalogus => (
          <option value={catalogus.url} key={catalogus.url}>
            {catalogus.domein} - {catalogus.rsin}
          </option>
        ) )
      }
    </select>
  );
};

CatalogusSelect.propTypes = {
  catalogi: PropTypes.arrayOf(CatalogusType).isRequired,
  onChange: PropTypes.func.isRequired,
  active: CatalogusType,
};


const CatalogusPicker = ({ onChange, active=null }) => {
  const client = useContext(ClientContext);

  const state = useAsync(async () => {
    const catalogi = await client.getPaginated('catalogussen');
    if (catalogi.length) {
      onChange(catalogi[0]);
    }
    return catalogi;
  }, [client.configState]);

  return (
    <FetchState {...state} render={ (value) => (
      <CatalogusSelect catalogi={value} onChange={onChange} active={active} />
    ) } />
  );
};

CatalogusPicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  active: CatalogusType,
};


export default CatalogusPicker;
