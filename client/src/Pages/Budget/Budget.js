import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom';

import { addTransaction } from 'data/actions/budget.actions';

import { Grid, Section } from './Budget.css';

import BudgetCategoryList from 'Pages/Budget/Components/BudgetCategoryList';
import BudgetTransactionList from 'Pages/Budget/Components/BudgetTransactionList/BudgetTransactionList';
import AddTransactionForm from 'Pages/Budget/Components/AddTransactionForm/AddTransactionForm';
import { Modal, Button, LoadingIndicator } from 'components';

const Budget = ({
    allCategories,
    budgetState, commonState, budget,
    addTransaction
}) => {
    const history = useHistory();

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
                    <React.Suspense fallback={<LoadingIndicator />}>
                        <BudgetCategoryList />
                    </React.Suspense>
                </Section>
                <Section>
                    <Button to='/budget/transactions/new'>Add new transaction</Button>
                    <React.Suspense fallback={<LoadingIndicator />}>
                        <BudgetTransactionList />
                    </React.Suspense>
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
    addTransaction,
})(Budget);
