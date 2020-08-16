import { combineReducers } from "redux";
import listReducer from "./listReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  list: listReducer,
  auth: authReducer,
  error: errorReducer,
});
