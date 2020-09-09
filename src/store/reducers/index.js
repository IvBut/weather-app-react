import {combineReducers} from "redux";
import languageReducer from "./languageReducer";
import appStatusReducer from "./appStatusReducer";

const rootReducer = combineReducers({languageReducer, appStatusReducer});

export default rootReducer;