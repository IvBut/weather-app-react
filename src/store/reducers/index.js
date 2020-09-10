import {combineReducers} from "redux";
import languageReducer from "./languageReducer";
import appStatusReducer from "./appStatusReducer";
import weatherReducer from "./weatherReducer";

const rootReducer = combineReducers({languageReducer, appStatusReducer, weatherReducer});

export default rootReducer;