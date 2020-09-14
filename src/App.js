import React from 'react';
import { useLocalStorage } from 'react-use';

import { ClientContext } from './Context';
import { Client } from './Client';


const App = () => {
  const [apiDetails, setApiDetails, removeApiDetails] = useLocalStorage(
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

  return (
    <ClientContext.Provider value={client}>

      <header>
        <h1>Catalogus browser</h1>
        <h2>Configuratie</h2>

        <input
          type="text"
          name="baseUrl"
          value={apiDetails.baseUrl}
          placeholder="Catalogi API root"
          onChange={updateApiDetail}
        />

        <input
          type="text"
          name="clientId"
          value={apiDetails.clientId}
          placeholder="Client ID"
          onChange={updateApiDetail}
        />

        <input
          type="password"
          name="secret"
          value={apiDetails.secret}
          placeholder="Client Secret"
          onChange={updateApiDetail}
        />

      </header>

      <section>
        <h2>Inhoud</h2>
      </section>

    </ClientContext.Provider>
  );
}

export default App;
