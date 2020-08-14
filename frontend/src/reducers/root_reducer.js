import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import CarrierPostsReducer from './carrier_posts_reducer'; 
import ShipperPostReducer from './shipper_posts_reducer';
import BookingReducer from './bookings_reducer';

const RootReducer = combineReducers({
    session,
    errors,
    carrier_posts: CarrierPostsReducer,
    shipper_posts: ShipperPostReducer,
    bookings: BookingReducer,
});

export default RootReducer;