import React, { } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Grid, Section, Fragment } from './Budget.css';

import BudgetCategoryList from 'Pages/Budget/Components/BudgetCategoryList';
import BudgetTransactionList from 'Pages/Budget/Components/BudgetTransactionList';
import AddTransactionView from 'Pages/Budget/Components/AddTransactionForm';
import { Modal, Button, SuspenseErrorBoundary } from 'components';


const Budget = () => {

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
                        <AddTransactionView />
                    </Modal>
                </Route>
            </Switch>
        </Fragment>
    )
}

export default Budget;