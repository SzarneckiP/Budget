import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchBudget, fetchBudgetedCategories } from 'data/actions/budget.actions';

const Budget = ({ fetchBudget, fetchBudgetedCategories }) => {

    useEffect(() => {
        fetchBudget(1);
        fetchBudgetedCategories(1);
    }, [fetchBudget, fetchBudgetedCategories]);

    return (
        <Fragment>Budget</Fragment>
    )
}

export default connect(state => {
    return {
        budget: state.budget.state.budget,
        budgetedCategories: state.budget
    }
}, {
    fetchBudget,
    fetchBudgetedCategories,
})(Budget);
