import React, {useState, useContext} from 'react';
import { Switch, Route } from 'react-router-dom';

import { Grid, Section, Fragment } from './Budget.css';
import { Modal, Button, SuspenseErrorBoundary } from 'components';
import BudgetContext from 'data/context/budget.context';

const BudgetCategoryList = React.lazy(()=> import('Pages/Budget/Components/BudgetCategoryList'));
const BudgetTransactionList = React.lazy(()=> import('Pages/Budget/Components/BudgetTransactionList'));
const AddTransactionView = React.lazy(()=> import('Pages/Budget/Components/AddTransactionForm'));


const Budget = () => {

    const [showTransactions, setShowTransactions] = useState();

    return (
        <Fragment>
            <BudgetContext.BudgetProvider>
                <Button to='/budget/transactions/new'>Add new transaction</Button>
                <Button onClick={()=> setShowTransactions(!showTransactions)}>
                    {showTransactions ?'Hide Transactions' : 'Show transactions'}
                </Button>
                <Grid>
                    <Section>
                        <SuspenseErrorBoundary>
                            <BudgetCategoryList />
                        </SuspenseErrorBoundary>
                    </Section>
                    <Section>
                        <SuspenseErrorBoundary>
                            {showTransactions && (
                                <BudgetTransactionList />
                            )}
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
            </BudgetContext.BudgetProvider>
        </Fragment>
    )
}

export default Budget;