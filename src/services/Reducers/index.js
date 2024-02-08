import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { productReducer } from "./productReducer";

export const rootReducer = combineReducers({
  authReducer, productReducer
})