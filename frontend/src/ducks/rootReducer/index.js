import { combineReducers } from "redux";
import auth from "../auth";
import geo from "../geoLocation";
import traffic from "../traffic";
import map from "../map";

const rootReducer = combineReducers({
  auth,
  geo,
  traffic,
  map
});

export default rootReducer;
