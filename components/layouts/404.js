import React from 'react';
import { css } from '@emotion/core';
const ERROR404 = ({ error }) => {
    return (<h1
        css={css`
            margin-top:5rem;
            text-align:center;
        `}
    >{error}</h1 >);
}

export default ERROR404;