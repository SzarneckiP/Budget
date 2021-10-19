import {
    BUDGET_GET,

    BUDGETED_CATEGORIES_GET
} from 'data/constants';

import API from 'data/fetch';

export const fetchBudget = (id) => (dispatch) => {

    const promise = API.budget.fetchBudget(id)

    dispatch({
        type: BUDGET_GET,
        promise,
    })
};

export const fetchBudgetedCategories = (id) => dispatch => {
    const promise = API.budget.fetchBudgetedCategories(id);

    dispatch({
        type: BUDGETED_CATEGORIES_GET,
        promise
    })
};