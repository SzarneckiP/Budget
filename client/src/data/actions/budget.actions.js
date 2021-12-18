import {
    BUDGET_GET,
    TRANSACTIONS_GET,
    BUDGETED_CATEGORIES_GET
} from 'data/constants';

import API from 'data/fetch';

export const fetchBudget = (id) => {

    const promise = API.budget.fetchBudget(id)

    return {
        type: BUDGET_GET,
        promise,
    }
};
export const fetchTransactions = (id) => {

    const promise = API.budget.fetchTransactions(id);

    return {
        type: TRANSACTIONS_GET,
        promise,
    }
}

export const fetchBudgetedCategories = (id) => {
    const promise = API.budget.fetchBudgetedCategories(id);

    return {
        type: BUDGETED_CATEGORIES_GET,
        promise,
    }
};