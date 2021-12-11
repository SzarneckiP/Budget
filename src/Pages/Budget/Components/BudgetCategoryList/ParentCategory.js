import React from 'react';

import { ParentCategory as Root, Wrapper } from './BudgetCategoryList.css';

const ParentCategory = ({ name, onClick }) => {
    return (

        <Wrapper>
            <Root onClick={onClick}>
                {name}
            </Root>
        </Wrapper>
    )
}

export default ParentCategory;