import React from 'react';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import { formatCurrency, formatDate } from 'utils';

import { List, ListItem } from './BudgetTransactionList.css';

const BudgetTransactionList = ({ transactions, allCategories }) => {

    const groupedTransactions = groupBy(
        transactions,
        transaction => new Date(transaction.date).getUTCFullYear(new Date(transaction.date).getUTCDate())
    )

    return (
        <List>
            {Object.entries(groupedTransactions).map(([key, transactions]) => (

                <li key={transactions.toString()}>
                    <ul>
                        {transactions.map(transaction => (
                            <ListItem key={transaction.id}>
                                <div >{transaction.description}</div>
                                <div>{formatCurrency(transaction.amount)}</div>
                                <div>{formatDate(transaction.date)}</div>
                                <div>{(allCategories.find(category => category.id === transaction.categoryId) || {}).name}</div>
                            </ListItem>
                        ))}
                    </ul>
                </li>
            ))
            }
        </List >
    )
}

export default connect(state => ({
    transactions: state.budget.state.transactions,
    allCategories: state.common.allCategories,
}))(BudgetTransactionList);