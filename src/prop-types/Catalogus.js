import PropTypes from 'prop-types';

const CatalogusType = PropTypes.shape({
  url: PropTypes.string.isRequired,
  domein: PropTypes.string.isRequired,
  rsin: PropTypes.string.isRequired,
  contactpersoonBeheerNaam: PropTypes.string.isRequired,
  contactpersoonBeheerTelefoonnummer: PropTypes.string.isRequired,
  contactpersoonBeheerEmailadres: PropTypes.string.isRequired,
  zaaktypen: PropTypes.arrayOf(PropTypes.string).isRequired,
  informatieobjecttypen: PropTypes.arrayOf(PropTypes.string).isRequired,
  besluittypen: PropTypes.arrayOf(PropTypes.string).isRequired,
});

export default CatalogusType;
