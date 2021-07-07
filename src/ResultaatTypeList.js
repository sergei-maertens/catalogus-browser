import React from 'react';
import PropTypes from 'prop-types';

import { CopyUrl } from './CopyUrl';


const ResultaatType = ({
    url,
    omschrijving,
    selectielijstklasse,
    toelichting,
    archiefnominatie,
    archiefactietermijn,
    brondatumArchiefprocedure,
}) => {
    return (
        <article>
            <header>
                { omschrijving }
            </header>
            <div>
                <CopyUrl url={url} />
            </div>
            <section>
                <div>Archivering</div>
                <p>
                    Archiefnominatie: {archiefnominatie}
                    <br />
                    Archiefactietermijn: {archiefactietermijn ?? '-'}
                </p>
                <div style={{overflow: 'auto'}}>
                    <code>{JSON.stringify(brondatumArchiefprocedure)}</code>
                </div>
            </section>

        </article>
    );
};

ResultaatType.propTypes = {
    url: PropTypes.string.isRequired,
    omschrijving: PropTypes.string.isRequired,
    selectielijstklasse: PropTypes.string.isRequired,
    toelichting: PropTypes.string.isRequired,
    archiefnominatie: PropTypes.string.isRequired,
    archiefactietermijn: PropTypes.string,
    brondatumArchiefprocedure: PropTypes.object.isRequired,
};



const ResultaatTypeList = ({ resultaattypen=[] }) => (
  <ul>
    {
      resultaattypen.map( rt => (
        <li key={rt.url}>
          <ResultaatType {...rt} />
        </li>
      ) )
    }
  </ul>
);

ResultaatTypeList.propTypes = {
  resultaattypen: PropTypes.arrayOf(PropTypes.shape(ResultaatType.propTypes)),
};

export default ResultaatTypeList;
