import {
    SET_SELECTED_PARENT_CATEGORY_ID,
} from 'data/constants';


const initialState = {
    selectedParentCategory: undefined,
};

const budget = (state = initialState, action) => {

    switch (action.type) {

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