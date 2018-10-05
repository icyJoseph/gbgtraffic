import { combineReducers } from "redux";
import auth from "../auth";
import geo from "../geoLocation";

const rootReducer = combineReducers({
  auth,
  geo
});

export default rootReducer;
