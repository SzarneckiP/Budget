import {
    BUDGET_GET_REQUEST,
    BUDGET_GET_SUCCESS,
    BUDGET_GET_FAILURE,

    BUDGETED_CATEGORIES_GET_REQUEST,
    BUDGETED_CATEGORIES_GET_SUCCESS,
    BUDGETED_CATEGORIES_GET_FAILURE,
} from 'data/constants';

import API from 'data/fetch';

export const fetchBudget = (id) => async (dispatch) => {
    dispatch({
        type: BUDGET_GET_REQUEST,
    });

    try {
        const res = await API.budget.fetchBudget(id);
        const data = await res.json();

        dispatch({
            type: BUDGET_GET_SUCCESS,
            payload: data,
        });
    } catch (err) {
        dispatch({
            type: BUDGET_GET_FAILURE,
        });
    }

};

export const fetchBudgetedCategories = (id) => async dispatch => {
    dispatch({
        type: BUDGETED_CATEGORIES_GET_REQUEST,
    });

    try {
        const res = await API.budget.fetchBudgetedCategories(id);
        const data = await res.json();

        dispatch({
            type: BUDGETED_CATEGORIES_GET_SUCCESS,
            payload: data,
        });
    } catch (err) {
        dispatch({
            type: BUDGETED_CATEGORIES_GET_FAILURE,
        });
    }

};