import {CHANGE_APP_STATUS} from "../../constants/actionTypes";

let initialState = {
  isPending : false
};

const appStatusReducer = (state = initialState, action) => {
    if (action.type === CHANGE_APP_STATUS) {
        return {
            ...state,
            isPending: action.payload.isPending
        }
    } else {
        return state;
    }

};

export default appStatusReducer;