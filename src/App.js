import React from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from 'react-use';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import { useImmerReducer } from 'use-immer';

import { ClientContext } from './Context';
import { Client } from './Client';
import Auth from './Auth';
import CatalogusPicker from './CatalogusPicker';
import CatalogusDetails from './CatalogusDetails';
import { UUIDFromUrl } from './Utils';

import './styles/App.scss';

const initialAppState = {
  catalogi: {}, // key-value map, keys are catalogi UUIDs, values are the objects
};

const appReducer = (draft, action) => {
  switch (action.type) {
    case 'CATALOGI_LOADED': {
      const catalogi = action.payload;
      draft.catalogi = Object.fromEntries(
        catalogi.map( catalogus => ([
          UUIDFromUrl(catalogus.url),
          catalogus
        ]) )
      );
      break;
    }
    default: {
      throw new Error(`Unknown action ${action.type}`);
    }
  }
};

const App = () => {
  /**
   * API client
   */
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

  /**
   * Application state
   */
  const [state, dispatch] = useImmerReducer(appReducer, initialAppState);

  return (
    <ClientContext.Provider value={client}>

      <Router>
        <AppHeader
          apiDetails={apiDetails}
          updateApiDetail={updateApiDetail}
          onCatalogiLoaded={ (catalogi) => dispatch({type: 'CATALOGI_LOADED', payload: catalogi}) }
        />

        <Switch>
          <Route path="/catalogi/:catalogusUuid">
            { Object.keys(state.catalogi).length && <CatalogusDetails catalogi={state.catalogi} /> }
          </Route>
          <Route path="/">
            <div style={{padding: '1em'}}>
              Selecteer linksboven een catalogus.
            </div>
          </Route>
        </Switch>
      </Router>

    </ClientContext.Provider>
  );
}


const initialHeaderState = {
  activeCatalogus: null,
};


const headerReducer = (draft, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_CATALOGUS': {
      const catalogus = action.payload;
      draft.activeCatalogus = catalogus;
      break;
    }
    default: {
      throw new Error(`Unknown action ${action.type}`);
    }
  }
};


const AppHeader = ({ apiDetails, updateApiDetail, onCatalogiLoaded }) => {
  const history = useHistory();

  const [state, dispatch] = useImmerReducer(headerReducer, initialHeaderState);

  const onCatalogusChange = (catalogus) => {
    dispatch({type: 'SET_ACTIVE_CATALOGUS', payload: catalogus});

    let redirectTo;
    if (catalogus) {
      redirectTo = `/catalogi/${UUIDFromUrl(catalogus.url)}`;
    } else {
      redirectTo = '/';
    }
    history.push(redirectTo);
  };

  return (
    <header className="app__header">
      <div className="app__catalogus-picker">
        <CatalogusPicker
          onChange={onCatalogusChange}
          active={state.activeCatalogus}
          onCatalogiLoaded={onCatalogiLoaded}
        />
      </div>

      <div className="app__auth">
        <Auth  authParams={apiDetails} onAuthParamChange={updateApiDetail} />
      </div>
    </header>
  );
};

AppHeader.propTypes = {
  apiDetails: PropTypes.object,
  updateApiDetail: PropTypes.func.isRequired,
  onCatalogiLoaded: PropTypes.func.isRequired,
};


export default App;
