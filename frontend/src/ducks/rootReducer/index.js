import { combineReducers } from "redux";
import auth from "../auth";
import geo from "../geoLocation";
import traffic from "../traffic";

const rootReducer = combineReducers({
  auth,
  geo,
  traffic
});

export default rootReducer;
