import {HIDE_ERROR_MESSAGE, SHOW_ERROR_MESSAGE} from "../../constants/actionTypes";

let initialState = {
    error: null
};

const errorReducer = (state = initialState , action) => {
    switch (action.type) {
        case SHOW_ERROR_MESSAGE:
            return {
                ...state,
                error: {
                    message: action.payload.message
                }
            };
        case HIDE_ERROR_MESSAGE:
            return {
                ...state,
                error: null
            };
        default: return state;
    }
};

export const getError = state => state.errorReducer.error;

export default errorReducer;