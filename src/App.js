import React, { useState } from 'react';
import { useLocalStorage } from 'react-use';

import { ClientContext, CatalogusContext } from './Context';
import { Client } from './Client';
import Auth from './Auth';
import CatalogusPicker from './CatalogusPicker';
import CatalogusDetails from './CatalogusDetails';

import './styles/App.scss';


const App = () => {
  const [apiDetails, setApiDetails] = useLocalStorage(
    'api-config', {baseUrl: '', clientId: '', secret: ''}
  );

  const updateApiDetail = (event) => {
    const newApiDetails = {
      ...apiDetails,
      [event.target.name]: event.target.value
    };
    setApiDetails(newApiDetails);
  };

  const client = new Client(apiDetails.baseUrl, apiDetails.clientId, apiDetails.secret);

  const [activeCatalogus, setActiveCatalogus] = useState(null);

  return (
    <ClientContext.Provider value={client}>

      <header className="app__header">
        <div className="app__catalogus-picker">
          <CatalogusPicker onChange={setActiveCatalogus} active={activeCatalogus} />
        </div>

        <div className="app__auth">
          <Auth  authParams={apiDetails} onAuthParamChange={updateApiDetail} />
        </div>
      </header>

      <CatalogusContext.Provider value={activeCatalogus}>
        <section className="app__content">
          { activeCatalogus ? <CatalogusDetails catalogus={activeCatalogus} /> : null }
        </section>
      </CatalogusContext.Provider>

    </ClientContext.Provider>
  );
}

export default App;
