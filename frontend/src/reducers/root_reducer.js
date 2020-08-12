import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import CarrierPostsReducer from './carrier_posts_reducer'; 

const RootReducer = combineReducers({
    session,
    errors,
    carrier_posts: CarrierPostsReducer,
});

export default RootReducer;