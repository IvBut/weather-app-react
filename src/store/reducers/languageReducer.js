import {CHANGE_LANGUAGE} from "../../constants/actionTypes";
import i18next from "i18next";
import {changeAppStatus} from "../actions/appStatusActionCreator";

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

// function changeLanguage(language) {
//
//     return dispatch => {
//         console.log('111111')
//         dispatch(changeAppStatus(true));
//         i18next.changeLanguage(language)
//             .then(()=>{
//                 console.log('aaaaaaaaa')
//                 return language
//             })
//     };
// }


export default languageReducer;