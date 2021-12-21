import React, { useRef, useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import { useTranslation } from 'react-i18next';

import { ToggleableList } from 'components';
import ParentCategory from './ParentCategory';
import CategoryItem from './CategoryItem';

import { selectParentCategory } from 'data/actions/budget.actions';

const BudgetCategoryList = ({ budget, transactions, budgetedCategories, allCategories,
    selectParentCategory
}) => {
    const { t } = useTranslation();

    const handleClickParentCategoryRef = useRef(null);

    const budgetedCategoriesByParent = useMemo(() => groupBy(
        budgetedCategories, item => allCategories.find(category => category.id === item.categoryId).parentCategory.name,
    ), [budgetedCategories, allCategories]);

    const handleClearParenCategorySelect = useCallback(() => {
        selectParentCategory(/*jeśli wywołanie jest puste domyślnie ustawia sie UNDEFINE*/);
        handleClickParentCategoryRef.current();
    }, [selectParentCategory, handleClickParentCategoryRef]);

    const handleSelectRestParentCategories = useCallback(() => {
        selectParentCategory(null);
        handleClickParentCategoryRef.current();
    }, [selectParentCategory, handleClickParentCategoryRef]);

    const listItems = useMemo(() => Object.entries(budgetedCategoriesByParent).map(([parentName, categories]) => ({
        id: parentName,
        Trigger: ({ onClick }) => (
            <ParentCategory
                name={parentName}
                onClick={() => {
                    onClick(parentName);
                    selectParentCategory(parentName);
                }}
                categories={categories}
                transactions={transactions}
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
                    transactions={transactions}
                />
            )
        }),
    })),
        [transactions, allCategories, selectParentCategory, budgetedCategoriesByParent]);

    const totalSpent = useMemo(() => transactions
        .reduce((acc, transaction) => acc + transaction.amount, 0),
        [transactions]);
    const restToSpend = useMemo(() => budget.totalAmount - totalSpent,
        [totalSpent, budget.totalAmount]);

    const amountTaken = useMemo(() => budgetedCategories.reduce((acc, budgetedCategory) => {
        const categoryTransactions = transactions
            .filter(transaction => transaction.categoryId === budgetedCategory.id);
        const categoryExpenses = categoryTransactions
            .reduce((acc, transaction) => acc + transaction.amount, 0);

        return acc + Math.max(categoryExpenses, budgetedCategory.budget)
    }, 0),
        [transactions, budgetedCategories]);

    const notBudgetedTransaction = useMemo(() => transactions
        .filter(transaction => {
            return !budgetedCategories.find(budgetedCategory => budgetedCategory.id === transaction.categoryId)
        }),
        [transactions, budgetedCategories]);

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

export default connect(state => ({
    budget: state.budget.budget,
    transactions: state.budget.budget.transactions,
    budgetedCategories: state.budget.budgetedCategories,
    allCategories: state.common.allCategories,
}), {
    selectParentCategory,
})(BudgetCategoryList);