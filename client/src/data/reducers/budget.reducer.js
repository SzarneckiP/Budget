import {
    BUDGET_GET_REQUEST,
    BUDGET_GET_SUCCESS,
    BUDGET_GET_FAILURE,

    BUDGETED_CATEGORIES_GET_REQUEST,
    BUDGETED_CATEGORIES_GET_SUCCESS,
    BUDGETED_CATEGORIES_GET_FAILURE,

    BUDGET_TRANSACTION_ADD_REQUEST,
    BUDGET_TRANSACTION_ADD_SUCCESS,
    BUDGET_TRANSACTION_ADD_FAILURE,

    SET_SELECTED_PARENT_CATEGORY_ID,

    LOADING_STATES,
} from 'data/constants';


const initialState = {
    loadingState: {},
    budget: {},
    transactions: [],
    budgetedCategories: [],
    selectedParentCategory: undefined,
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
        //BUDGET_ADD_TRANSACTION
        case BUDGET_TRANSACTION_ADD_REQUEST:
            return {
                ...state,
                loadingState: {
                    ...state.loadingState,
                    [action.type]: LOADING_STATES.LOADING,
                }
            }

        case BUDGET_TRANSACTION_ADD_SUCCESS:
            delete newLoadingState.BUDGET_TRANSACTION_ADD_REQUEST;

            return {
                ...state,
                loadingState: newLoadingState,
                budget: {
                    ...state.budget,
                    transactions: [
                        action.payload,
                        ...state.budget.transactions,
                    ],
                },
            }

        case BUDGET_TRANSACTION_ADD_FAILURE:
            delete newLoadingState.BUDGET_TRANSACTION_ADD_REQUEST;

            return {
                ...state,
                loadingState: newLoadingState,
                budget: {
                    ...state.budget,
                },
            }


        //SET_SELECTED_PARENT_CATEGORY

        case SET_SELECTED_PARENT_CATEGORY_ID:
            return {
                ...state,
                selectedParentCategory: action.payload,
            }

        default:
            return state;
    }
};

export default budget;