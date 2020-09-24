import React from 'react';
import PropTypes from 'prop-types';


const Auth = ({ authParams: { baseUrl, clientId, secret }, onAuthParamChange }) => {
    return (
        <>
            <input
              type="text"
              name="baseUrl"
              value={baseUrl}
              placeholder="Catalogi API root"
              onChange={onAuthParamChange}
            />

            <input
              type="text"
              name="clientId"
              value={clientId}
              placeholder="Client ID"
              onChange={onAuthParamChange}
            />

            <input
              type="password"
              name="secret"
              value={secret}
              placeholder="Client Secret"
              onChange={onAuthParamChange}
            />
        </>
    );
};

Auth.propTypes = {
    authParams: PropTypes.object.isRequired,
    onAuthParamChange: PropTypes.func.isRequired,
};


export default Auth;
