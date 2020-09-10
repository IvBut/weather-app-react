import {CHANGE_LANGUAGE} from "../../constants/actionTypes";
import {changeAppStatus} from "./appStatusActionCreator";
import i18next from "i18next";

// export function changeLanguage(languageName) {
//     return {
//         type: CHANGE_LANGUAGE,
//         payload: {
//             language: languageName
//         }
//     }
// }


export function changeLanguage(languageName) {
   return dispatch => {
       dispatch(changeAppStatus(true));
       i18next.changeLanguage(languageName)
           .then(()=>{
               dispatch({type:CHANGE_LANGUAGE, payload: {language: languageName}});
               dispatch(changeAppStatus(false))
           })
   }
}