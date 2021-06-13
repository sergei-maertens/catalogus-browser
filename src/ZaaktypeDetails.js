import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';


const ZaaktypeDetails = ({ foo }) => {
  const { uuid } = useParams();
  return (
    `Showing zaaktype ${uuid}`
  );
};

ZaaktypeDetails.propTypes = {
};


export default ZaaktypeDetails;
