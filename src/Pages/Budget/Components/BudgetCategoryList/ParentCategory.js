import React, { useMemo } from 'react';

import { ParentCategory as Root, Wrapper, CategoryAmount } from './BudgetCategoryList.css';

const ParentCategory = ({ name, onClick, categories, transactions }) => {

    const categoryLeftValue = useMemo(() => { //useMemo nie wykonuje ponownego uruchomienia  jeśli komponent sie przerenderuje
        const budgeted = (() => {
            try {
                return categories.reduce((acc, category) => acc + category.budget, 0)
            } catch (err) {
                return null;
            }
        })();

        const parentCategoryTransactions = transactions
            .filter(transaction => {
                return categories.find(category => category.categoryId === transaction.categoryId)
            });

        const spentOnParentCategory = parentCategoryTransactions
            .reduce((acc, transaction) => acc + transaction.amount, 0);

        const totalLeft = budgeted
            ? budgeted - spentOnParentCategory
            : null;
        return totalLeft;

    }, [categories, transactions]);

    return (
        <Wrapper>
            <Root onClick={onClick}>
                <span>{name}</span>
                <CategoryAmount negative={categoryLeftValue < 0}>
                    {categoryLeftValue}
                </CategoryAmount>
            </Root>
        </Wrapper>
    )
}

export default ParentCategory;