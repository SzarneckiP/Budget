import React from 'react';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';

import { ToggleableList } from 'components';
import ParentCategory from './ParentCategory';
import CategoryItem from './CategoryItem';

const BudgetCategoryList = ({ budget, budgetedCategories, allCategories }) => {

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

    }))

    return (
        <div>
            <ToggleableList items={listItems} />
        </div>
    )
}

export default connect(state => ({
    budget: state.budget.state.budget,
    budgetedCategories: state.budget.state.budgetedCategories,
    allCategories: state.common.allCategories,
}))(BudgetCategoryList);