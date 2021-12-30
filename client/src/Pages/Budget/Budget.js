import React, { useEffect, useMemo, Fragment } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { fetchBudget, fetchBudgetedCategories } from 'data/actions/budget.actions';
import { fetchAllCategories } from 'data/actions/common.actions';

import { Grid } from './Budget.css';

import BudgetCategoryList from 'Pages/Budget/Components/BudgetCategoryList';
import BudgetTransactionList from 'Pages/Budget/Components/BudgetTransactionList/BudgetTransactionList';
import AddTransactionForm from 'Pages/Budget/Components/AddTransactionForm/AddTransactionForm';
import { LoadingIndicator, Modal, Button } from 'components';

const Budget = ({
    allCategories,
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

    const handleSubmitAddTransaction = (values) => {
        console.log({ values })
    }

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
                    <Modal>
                        <AddTransactionForm
                            categories={allCategories}
                            groupCategoriesBy={'parentCategory.name'}
                            onSubmit={handleSubmitAddTransaction}
                        />
                    </Modal>
                </Route>
            </Switch>
        </Fragment>
    )
}

export default connect(state => {
    return {
        budgetState: state.budget.loadingState,
        commonState: state.common.loadingState,
        allCategories: state.common.allCategories,
    }
}, {
    fetchBudget,
    fetchBudgetedCategories,
    fetchAllCategories,
})(Budget);
