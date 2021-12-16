import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';

import { fetchBudget, fetchBudgetedCategories } from 'data/actions/budget.actions';
import { fetchAllCategories } from 'data/actions/common.actions';

import { Grid } from './Budget.css';

import BudgetCategoryList from 'Pages/Budget/Components/BudgetCategoryList';

const Budget = ({
    budgetState, commonState,
    fetchBudget, fetchBudgetedCategories, fetchAllCategories
}) => {

    useEffect(() => {
        fetchBudget(1);
        fetchBudgetedCategories(1);
        fetchAllCategories();
    }, [fetchBudget, fetchBudgetedCategories, fetchAllCategories]);

    const isLoaded = useMemo( //useMemo nie wykonuje ponownego uruchomienia  jeśli komponent sie przerenderuje
        () => (!!commonState && Object.keys(commonState).length === 0)
            && (!!budgetState && Object.keys(budgetState).length === 0),
        [commonState, budgetState]
    );
    console.log('isLoaded: ', isLoaded);
    return (
        <Grid>
            <section>
                <BudgetCategoryList />
            </section>
            <section>
                {'Transaction list'}
            </section>
        </Grid>
    )
}

export default connect(state => {
    return {
        budget: state.budget.state.budget,
        budgetState: state.budget.loadingState,
        commonState: state.common.loadingState,
    }
}, {
    fetchBudget,
    fetchBudgetedCategories,
    fetchAllCategories,
})(Budget);
