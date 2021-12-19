import {
    BUDGET_GET_REQUEST,
    BUDGET_GET_SUCCESS,
    BUDGET_GET_FAILURE,

    BUDGETED_CATEGORIES_GET_REQUEST,
    BUDGETED_CATEGORIES_GET_SUCCESS,
    BUDGETED_CATEGORIES_GET_FAILURE,

    TRANSACTIONS_GET_REQUEST,
    TRANSACTIONS_GET_SUCCESS,
    TRANSACTIONS_GET_FAILURE,

    LOADING_STATES,
} from 'data/constants';


const initialState = {
    loadingState: {},
    budget: {},
    transactions: [],
    budgetedCategories: [],
};

const budget = (state = initialState, action) => {

    const newLoadingState = { ...state.loadingState };

    switch (action.type) {
        case BUDGET_GET_REQUEST:
            return {
                ...state,
                loadingState: {
                    ...state.loadingState,
                    [action.type]: LOADING_STATES.LOADING,
                }
            }

        case BUDGET_GET_SUCCESS:
            delete newLoadingState.BUDGET_GET_REQUEST;

            return {
                ...state,
                loadingState: newLoadingState,
                budget: action.payload,
            }

        case BUDGET_GET_FAILURE:
            delete newLoadingState.BUDGET_GET_REQUEST;

            return {
                ...state,
                loadingState: newLoadingState,
                budget: {},
            }

        case TRANSACTIONS_GET_REQUEST:
            return {
                ...state,
                loadingState: {
                    ...state.loadingState,
                    [action.type]: LOADING_STATES.LOADING,
                }
            }

        case TRANSACTIONS_GET_SUCCESS:
            delete newLoadingState.TRANSACTIONS_GET_REQUEST;

            return {
                ...state,
                loadingState: newLoadingState,
                transactions: action.payload,
            }

        case TRANSACTIONS_GET_FAILURE:
            delete newLoadingState.TRANSACTIONS_GET_REQUEST;

            return {
                ...state,
                loadingState: newLoadingState,
                transactions: [],
            }

        //BUDGETED_CATEGORIES
        case BUDGETED_CATEGORIES_GET_REQUEST:
            return {
                ...state,
                loadingState: {
                    ...state.loadingState,
                    [action.type]: LOADING_STATES.LOADING,
                }
            }

        case BUDGETED_CATEGORIES_GET_SUCCESS:
            delete newLoadingState.BUDGETED_CATEGORIES_GET_REQUEST;

            return {
                ...state,
                loadingState: newLoadingState,
                budgetedCategories: action.payload,
            }

        case BUDGETED_CATEGORIES_GET_FAILURE:
            delete newLoadingState.BUDGETED_CATEGORIES_GET_REQUEST;

            return {
                ...state,
                loadingState: newLoadingState,
                budgetedCategories: [],
            }



        default:
            return state;
    }
};

export default budget;