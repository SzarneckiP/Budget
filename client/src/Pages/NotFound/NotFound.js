import React, { Fragment } from 'react';
import { DescriptionNF, Wrapper, Description404} from './NotFound.css';

const notFound = ({ children }) => {
    return (
        <Fragment>
            <Wrapper >
                <Description404>
                    404
                </Description404>
                <DescriptionNF>
                    Not Found
                </DescriptionNF>
                {children}
            </Wrapper>
        </Fragment>
    )
}

export default notFound;