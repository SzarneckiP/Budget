import React, { useEffect, useMemo, Fragment } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { fetchBudget, fetchBudgetedCategories } from 'data/actions/budget.actions';
import { fetchAllCategories } from 'data/actions/common.actions';

import { Grid } from './Budget.css';

import BudgetCategoryList from 'Pages/Budget/Components/BudgetCategoryList';
import BudgetTransactionList from 'Pages/Budget/Components/BudgetTransactionList/BudgetTransactionList';
import { LoadingIndicator, Modal, Button } from 'components';

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

    return (
        <Fragment>
            <Grid>
                <section>
                    {isLoaded ? <BudgetCategoryList /> : <LoadingIndicator />}
                </section>
                <section>
                    {isLoaded ?
                        <Fragment>
                            <Button to='/budget/transactions/new'>Add new transaction</Button>
                            <BudgetTransactionList />
                        </Fragment>

                        : <LoadingIndicator />}
                </section>
            </Grid>
            <Switch>
                <Route path='/budget/transactions/new'>
                    <Modal>Modal Content</Modal>
                </Route>
            </Switch>
        </Fragment>
    )
}

export default connect(state => {
    return {
        budgetState: state.budget.loadingState,
        commonState: state.common.loadingState,
    }
}, {
    fetchBudget,
    fetchBudgetedCategories,
    fetchAllCategories,
})(Budget);
