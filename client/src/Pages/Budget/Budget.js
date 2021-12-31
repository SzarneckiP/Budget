import React, { useEffect, useMemo, Fragment } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom';

import { fetchBudget, fetchBudgetedCategories, addTransaction } from 'data/actions/budget.actions';
import { fetchAllCategories } from 'data/actions/common.actions';

import { Grid, Section } from './Budget.css';

import BudgetCategoryList from 'Pages/Budget/Components/BudgetCategoryList';
import BudgetTransactionList from 'Pages/Budget/Components/BudgetTransactionList/BudgetTransactionList';
import AddTransactionForm from 'Pages/Budget/Components/AddTransactionForm/AddTransactionForm';
import { LoadingIndicator, Modal, Button } from 'components';

const Budget = ({
    allCategories,
    budgetState, commonState, budget,
    fetchBudget, fetchBudgetedCategories, fetchAllCategories, addTransaction
}) => {
    const history = useHistory();
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
        addTransaction({
            budgetId: budget.id,
            data: values,
        }).then(() => history.goBack());
    };

    return (
        <Fragment>
            <Grid>
                <Section>
                    {isLoaded ?
                        <BudgetCategoryList />
                        : <LoadingIndicator />}
                </Section>
                <Section>
                    {isLoaded ?
                        <Fragment>
                            <Button to='/budget/transactions/new'>Add new transaction</Button>
                            <BudgetTransactionList />
                        </Fragment>
                        : <LoadingIndicator />}
                </Section>
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
        budget: state.budget.budget,
        budgetState: state.budget.loadingState,
        commonState: state.common.loadingState,
        allCategories: state.common.allCategories,
    }
}, {
    fetchBudget,
    fetchBudgetedCategories,
    fetchAllCategories,
    addTransaction,
})(Budget);
