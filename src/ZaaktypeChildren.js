import React from 'react';
import PropTypes from 'prop-types';

const ZaaktypeChildren = ({ element, title, children }) => {
  return (
    <section className={`zaaktype__${element}`}>
      <h2 className="zaaktype__subtitle">{title}</h2>
      {children}
    </section>
  );
};

ZaaktypeChildren.propTypes = {
  element: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};


export default ZaaktypeChildren;
