import React, { useRef, useMemo, useCallback, useContext } from 'react';
import { groupBy } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import { ToggleableList } from 'components';
import ParentCategory from './ParentCategory';
import CategoryItem from './CategoryItem';

import BudgetContext from 'data/context/budget.context';
import API from 'data/fetch';

const BudgetCategoryList = () => {
    const { data: budget } = useQuery(['budget', 1], () => API.budget.fetchBudget(1));
    const { data: allCategories } = useQuery('allCategories', API.common.fetchAllCategories);
    const { data: budgetedCategories } = useQuery(['budgetedCategories', 1], () => API.budget.fetchBudgetedCategories(1));

    const {setSelectedParentCategoryId} = useContext(BudgetContext.store);

    const { t } = useTranslation();

    const handleClickParentCategoryRef = useRef(null);

    const budgetedCategoriesByParent = useMemo(() => groupBy(
        budgetedCategories, item => allCategories.find(category => category.id === item.categoryId).parentCategory.name,
    ), [budgetedCategories, allCategories]);

    const handleClearParenCategorySelect = useCallback(() => {
        setSelectedParentCategoryId(/*jeśli wywołanie jest puste domyślnie ustawia sie UNDEFINE*/);
        handleClickParentCategoryRef.current();
    }, [setSelectedParentCategoryId, handleClickParentCategoryRef]);

    const handleSelectRestParentCategories = useCallback(() => {
        setSelectedParentCategoryId(null);
        handleClickParentCategoryRef.current();
    }, [setSelectedParentCategoryId, handleClickParentCategoryRef]);

    const listItems = useMemo(() => Object.entries(budgetedCategoriesByParent).map(([parentName, categories]) => ({
        id: parentName,
        Trigger: ({ onClick }) => (
            <ParentCategory
                name={parentName}
                onClick={() => {
                    onClick(parentName);
                    setSelectedParentCategoryId(parentName);
                }}
                categories={categories}
                transactions={budget.transactions}
            />
        ),
        children: categories.map(budgetedCategory => {

            const { name } = allCategories
                .find(category => category.id === budgetedCategory.categoryId);

            return (
                <CategoryItem
                    key={budgetedCategory.id}
                    name={name}
                    item={budgetedCategory}
                    transactions={budget.transactions}
                />
            )
        }),
    })),
        [budget.transactions, allCategories, setSelectedParentCategoryId, budgetedCategoriesByParent]);

    const totalSpent = useMemo(() => budget.transactions
        .reduce((acc, transaction) => acc + transaction.amount, 0),
        [budget.transactions]);
    const restToSpend = useMemo(() => budget.totalAmount - totalSpent,
        [totalSpent, budget.totalAmount]);

    const amountTaken = useMemo(() => budgetedCategories.reduce((acc, budgetedCategory) => {
        const categoryTransactions = budget.transactions
            .filter(transaction => transaction.categoryId === budgetedCategory.id);
        const categoryExpenses = categoryTransactions
            .reduce((acc, transaction) => acc + transaction.amount, 0);

        return acc + Math.max(categoryExpenses, budgetedCategory.budget)
    }, 0),
        [budget.transactions, budgetedCategories]);

    const notBudgetedTransaction = useMemo(() => budget.transactions
        .filter(transaction => {
            return !budgetedCategories.find(budgetedCategory => budgetedCategory.id === transaction.categoryId)
        }),
        [budget.transactions, budgetedCategories]);

    const notBudgetedExpenses = useMemo(() => notBudgetedTransaction
        .reduce((acc, transaction) => acc + transaction.amount, 0),
        [notBudgetedTransaction]);

    const availableForRestCategories = useMemo(() => budget.totalAmount - amountTaken - notBudgetedExpenses,
        [amountTaken, budget.totalAmount, notBudgetedExpenses]);

    return (
        <div>
            <ParentCategory
                name={budget.name}
                amount={restToSpend}
                onClick={handleClearParenCategorySelect}
            />
            <ToggleableList
                items={listItems}
                clickRef={handleClickParentCategoryRef}
            />
            <ParentCategory
                name={t('Other Categories')}
                amount={availableForRestCategories}
                onClick={handleSelectRestParentCategories}
            />
        </div>
    )
}

export default BudgetCategoryList;