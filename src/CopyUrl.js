import React from 'react';
import PropTypes from 'prop-types';

import { CopyToClipboard } from 'react-copy-to-clipboard';


const CopyUrl = ({ url }) => {
    return (
        <>
            <code>{url}</code>
            <CopyToClipboard text={ url }
                onCopy={() => alert('Gekopieerd!')}>
                <button type="button">Kopiëren</button>
            </CopyToClipboard>
        </>
    );
};

CopyUrl.propTypes = {
    url: PropTypes.string.isRequired,
};


export { CopyUrl };
