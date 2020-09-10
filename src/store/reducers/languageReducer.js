import {CHANGE_LANGUAGE} from "../../constants/actionTypes";

let initialState = {
    currentLanguage: 'en'
};


const languageReducer = (state = initialState, action) => {
    if (action.type === CHANGE_LANGUAGE) {
        return {
            ...state,
          currentLanguage:action.payload.language
        };
    } else {
        return state;
    }

};

export default languageReducer;