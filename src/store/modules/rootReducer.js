import { combineReducers } from "redux";
import entries from "./entries/reducers";
import user from "./user/reducers";

export default combineReducers({
    entries,
    user
});