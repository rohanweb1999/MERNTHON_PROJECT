/**
 * @author Rohan Gajjar
 */
import blogUserReducer from '../reducers/Reducer';

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    blogUserReducer,
})

export default rootReducer;