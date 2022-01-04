import React, { } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom';

import { addTransaction } from 'data/actions/budget.actions';

import { Grid, Section, Fragment } from './Budget.css';

import BudgetCategoryList from 'Pages/Budget/Components/BudgetCategoryList';
import BudgetTransactionList from 'Pages/Budget/Components/BudgetTransactionList/BudgetTransactionList';
import AddTransactionForm from 'Pages/Budget/Components/AddTransactionForm/AddTransactionForm';
import { Modal, Button, SuspenseErrorBoundary } from 'components';

const Budget = ({
    allCategories,
    budget,
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
            <Button to='/budget/transactions/new'>Add new transaction</Button>
            <Grid>
                <Section>
                    <SuspenseErrorBoundary>
                        <BudgetCategoryList />
                    </SuspenseErrorBoundary>
                </Section>
                <Section>
                    <SuspenseErrorBoundary>
                        <BudgetTransactionList />
                    </SuspenseErrorBoundary>
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
