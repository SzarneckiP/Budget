import React from 'react';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';

const BudgetCategoryList = ({ budgetedCategories, allCategories }) => {

    const budgetedCategoriesByParent = groupBy(
        budgetedCategories, item => allCategories.find(category => category.id === item.categoryId).parentCategory.name,
    );

    console.log('budgetedCategories: ', budgetedCategories);
    console.log('budgetedCategoriesByParent:', budgetedCategoriesByParent);

    return (
        <div>
            BudgetCategoryList
        </div>
    )
}

export default connect(state => ({
    budgetedCategories: state.budget.state.budgetedCategories,
    allCategories: state.common.allCategories,
}))(BudgetCategoryList);