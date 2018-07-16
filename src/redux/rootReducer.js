import { combineReducers } from 'redux';

// @REDUCERS
import searchTrackReducer from './searchTrackReducer';
import embedTrackReducer from './embedTrackReducer';
// @ROOT REDUCER
const rootReducer =  combineReducers({
    searchTrackReducer,
    embedTrackReducer
});

export default rootReducer;