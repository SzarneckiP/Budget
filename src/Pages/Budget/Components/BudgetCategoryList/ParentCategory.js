<<<<<<< HEAD
import React, { useMemo } from 'react'; //useMemo hook który nie odpala akcji kiedy przerenderowuje się aplikajca

import { ParentCategory as Root, Wrapper, CategoryAmount } from './BudgetCategoryList.css';

import { formatCurrency } from 'utils/index';

const ParentCategory = ({ name, onClick, categories, transactions }) => {
    const categoryLeftValue = useMemo(() => {
        const budgeted = (() => {
            try {
                return categories.reduce((acc, category) => acc + category.budget, 0);
            } catch (error) {
=======
import React, { useMemo } from 'react';

import { ParentCategory as Root, Wrapper, CategoryAmount } from './BudgetCategoryList.css';

const ParentCategory = ({ name, onClick, categories, transactions }) => {

    const categoryLeftValue = useMemo(() => { //useMemo nie wykonuje ponownego uruchomienia  jeśli komponent sie przerenderuje
        const budgeted = (() => {
            try {
                return categories.reduce((acc, category) => acc + category.budget, 0)
            } catch (err) {
>>>>>>> 0fcb5da81c83522312726b83e1058ec5b5af7ddb
                return null;
            }
        })();

        const parentCategoryTransactions = transactions
            .filter(transaction => {
                return categories.find(category => category.categoryId === transaction.categoryId)
            });
<<<<<<< HEAD

        const spentOnParentCategory = parentCategoryTransactions
            .reduce((acc, transaction) => acc + transaction.amount, 0);

        const totalLeft = budgeted
            ? budgeted - spentOnParentCategory
            : null;

        return totalLeft;
    }, [categories, transactions]);
=======

        const spentOnParentCategory = parentCategoryTransactions
            .reduce((acc, transaction) => acc + transaction.amount, 0);

        const totalLeft = budgeted
            ? budgeted - spentOnParentCategory
            : null;
        return totalLeft;

    }, [categories, transactions]);

>>>>>>> 0fcb5da81c83522312726b83e1058ec5b5af7ddb
    return (
        <Wrapper>
            <Root onClick={onClick}>
                <span>{name}</span>
                <CategoryAmount negative={categoryLeftValue < 0}>
<<<<<<< HEAD
                    {formatCurrency(categoryLeftValue)}
=======
                    {categoryLeftValue}
>>>>>>> 0fcb5da81c83522312726b83e1058ec5b5af7ddb
                </CategoryAmount>
            </Root>
        </Wrapper>
    )
}

export default ParentCategory;