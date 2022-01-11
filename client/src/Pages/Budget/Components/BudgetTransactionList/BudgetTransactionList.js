import React, { useMemo, useContext } from 'react';
import { groupBy } from 'lodash';
import { useQuery } from 'react-query';

import { List, ListItem } from './BudgetTransactionList.css';
import { formatCurrency, formatDate } from 'utils';
import API from 'data/fetch';
import BudgetContext from 'data/context/budget.context';

const BudgetTransactionList = () => {

    const { data: budget } = useQuery(['budget', 1], () => API.budget.fetchBudget(1));
    const { data: allCategories } = useQuery('allCategories', API.common.fetchAllCategories);
    const { data: budgetedCategories } = useQuery(['budgetedCategories', 1], () => API.budget.fetchBudgetedCategories(1));

    const { selectedParentCategoryId } = useContext(BudgetContext.store);
   
    const filteredTransactionsBySelectedParentCategory = useMemo(() => {
        if (typeof selectedParentCategoryId === 'undefined') {
            return budget.transactions;
        };

        if (selectedParentCategoryId === null) {
            return budget.transactions.filter(transaction => {
                const hasBudgetCategory = budgetedCategories
                    .some(budgetedCategory => budgetedCategory.categoryId === transaction.categoryId);
                return !hasBudgetCategory;
            });
        };

        return budget.transactions
            .filter(transaction => {
                try {
                    const category = allCategories
                        .find(category => category.id === transaction.categoryId);
                    const parentCategoryName = category.parentCategory.name;
                    return parentCategoryName === selectedParentCategoryId;
                } catch (error) {
                    return false;
                }
            });
    }, [allCategories, budgetedCategories, selectedParentCategoryId, budget.transactions]);

    const groupedTransactions = useMemo(() => groupBy(
        filteredTransactionsBySelectedParentCategory,
        transaction => new Date(transaction.date).getUTCDate()
    ), [filteredTransactionsBySelectedParentCategory]);

    return (
        <List>
            {Object.entries(groupedTransactions).map(([key, transactions]) => (

                <li key={key}>
                    <ul>
                        {transactions.map(transaction => (
                            <ListItem key={transaction.id}>
                                <div >{transaction.description}</div>
                                <div>{formatCurrency(transaction.amount)}</div>
                                <div>{formatDate(transaction.date)}</div>
                                <div>{(allCategories.find(category => category.id === transaction.categoryId) || {}).name}</div>
                            </ListItem>
                        ))}
                    </ul>
                </li>
            ))
            }
        </List >
    )
}

export default BudgetTransactionList;