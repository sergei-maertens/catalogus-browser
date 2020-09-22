import React from 'react';
import PropTypes from 'prop-types';


const FetchState = ({ loading, render, error, value }) => {
    if (loading) {
        return (<div>Loading...</div>);
    }

    if (error) {
        return (<div>{error.toString()}</div>);
    }
    return render(value);
};

FetchState.propTypes = {
    loading: PropTypes.bool.isRequired,
    render: PropTypes.func.isRequired,
    error: PropTypes.object,
};


export { FetchState };
