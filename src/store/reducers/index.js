import {combineReducers} from "redux";
import languageReducer from "./languageReducer";
import appStatusReducer from "./appStatusReducer";
import weatherReducer from "./weatherReducer";
import errorReducer from "./errorReducer";

const rootReducer = combineReducers({languageReducer, appStatusReducer, weatherReducer, errorReducer});

export default rootReducer;