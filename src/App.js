import React, { useState } from 'react';
import { useLocalStorage } from 'react-use';

import { ClientContext } from './Context';
import { Client } from './Client';
import { CatalogusList } from './CatalogusList';
import { SidePanel } from './SidePanel';
import Auth from './Auth';

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

  const [renderSidePanel, setRenderSidePanel] = useState(null);

  return (
    <ClientContext.Provider value={client}>

      <header className="app__header">
        <div className="app__catalogus-picker">
          Catalogus
        </div>

        <div className="app__auth">
          <Auth  authParams={apiDetails} onAuthParamChange={updateApiDetail} />
        </div>
      </header>

      <section className="app__content">
            Content
            {/*<CatalogusList setRenderSidePanel={setRenderSidePanel} />*/}
            {/*<SidePanel render={ renderSidePanel } />*/}
      </section>

    </ClientContext.Provider>
  );
}

export default App;
