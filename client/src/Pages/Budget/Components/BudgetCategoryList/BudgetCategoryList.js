import React from 'react';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import { useTranslation } from 'react-i18next';

import { ToggleableList } from 'components';
import ParentCategory from './ParentCategory';
import CategoryItem from './CategoryItem';

const BudgetCategoryList = ({ budget, budgetedCategories, allCategories }) => {
    const { t } = useTranslation();
    const budgetedCategoriesByParent = groupBy(
        budgetedCategories, item => allCategories.find(category => category.id === item.categoryId).parentCategory.name,
    );

    const listItems = Object.entries(budgetedCategoriesByParent).map(([parentName, categories]) => ({
        id: parentName,
        Trigger: ({ onClick }) => (
            <ParentCategory
                name={parentName}
                onClick={() => onClick(parentName)}
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
    }));

    // const totalSpent = budget.transactions
    //     .reduce((acc, transaction) => acc + transaction.amount, 0);
    // const restToSpend = budget.totalAmount - totalSpent;

    // const amountTaken = budgetedCategories.reduce((acc, budgetedCategory) => {
    //     const categoryTransactions = budget.transactions
    //         .filter(transaction => transaction.categoryId === budgetedCategory.id);
    //     const categoryExpenses = categoryTransactions
    //         .reduce((acc, transaction) => acc + transaction.amount, 0);

    //     return acc + Math.Max(categoryExpenses, budgetedCategory.budget);
    // }, 0);

    // const notBudgetedTransaction = budget.transactions
    //     .filter(transaction => {
    //         return !budgetedCategories.find(budgetedCategory => budgetedCategory.id === transaction.categoryId)
    //     });

    // const notBudgetedExpenses = notBudgetedTransaction
    //     .reduce((acc, transaction) => acc + transaction.amount, 0);

    // const availableForRestCategories = budget.totalAmount - amountTaken - notBudgetedExpenses;

    return (
        <div>
            {/* <ParentCategory
                name={budget.name}
                amount={restToSpend}
            /> */}
            <ToggleableList items={listItems} />
            {/* <ParentCategory
                name={t('Other Categories')}
                amount={availableForRestCategories}
            /> */}
        </div>
    )
}

export default connect(state => ({
    budget: state.budget.state.budget,
    budgetedCategories: state.budget.state.budgetedCategories,
    allCategories: state.common.allCategories,
}))(BudgetCategoryList);