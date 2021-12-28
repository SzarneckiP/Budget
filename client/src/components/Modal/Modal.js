import React from 'react';
import { createPortal } from 'react-dom';
import { useHistory } from 'react-router-dom';

import { Wrapper, Content, CloseIcon } from './Modal.css';

const Modal = ({ children }) => {
    const history = useHistory();

    return createPortal(
        <Wrapper onClick={history.goBack}>
            <Content onClick={e => e.stopPropagation()}>
                <CloseIcon onClick={history.goBack}>&times;</CloseIcon>
                {children}
            </Content>
        </Wrapper>,
        document.querySelector('#modal')
    )
}

export default Modal;