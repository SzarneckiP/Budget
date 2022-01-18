import React, { Fragment } from 'react';
import { Description, Wrapper, Description404} from './NotFound.css';

const notFound = ({ children }) => {
    return (
        <Fragment>
            <Wrapper >
                <Description>
                    <h1>404</h1>
                    <h2>Not Found</h2>
                </Description>
                {children}
            </Wrapper>
        </Fragment>
    )
}

export default notFound;