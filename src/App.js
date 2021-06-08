import React from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from 'react-use';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from 'react-router-dom';
import { useImmerReducer } from 'use-immer';

import { ClientContext } from './Context';
import { Client } from './Client';
import Auth from './Auth';
import CatalogusPicker from './CatalogusPicker';
import CatalogusDetails from './CatalogusDetails';

import './styles/App.scss';

const initialState = {
  activeCatalogus: null,
};


const reducer = (draft, action) => {
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

  return (
    <ClientContext.Provider value={client}>

      <Router>
        <AppHeader apiDetails={apiDetails} updateApiDetail={updateApiDetail} />

        <Switch>
          <Route path="/catalogi/:uuid">
            <CatalogusDetails />
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


const AppHeader = ({ apiDetails, updateApiDetail }) => {
  const history = useHistory();

  const [state, dispatch] = useImmerReducer(reducer, initialState);

  const onCatalogusChange = (catalogus) => {
    dispatch({type: 'SET_ACTIVE_CATALOGUS', payload: catalogus});

    let redirectTo;
    if (catalogus) {
      const uuid = catalogus.url.split('/').pop();
      redirectTo = `/catalogi/${uuid}`;
    } else {
      redirectTo = '/';
    }
    history.push(redirectTo);
  };

  return (
    <header className="app__header">
      <div className="app__catalogus-picker">
        <CatalogusPicker onChange={onCatalogusChange} active={state.activeCatalogus} />
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
};


export default App;
