import {RECEIVE_BOOKING, RECEIVE_BOOKINGS} from '../actions/booking_actions';

const BookingReducer = (state={}, action) => {
    Object.freeze(state);
    //let newState = Object.assign({}, state);

    switch(action.type){
        case RECEIVE_BOOKING:
            return action.bookingData.data;
        case RECEIVE_BOOKINGS:
            return action.bookingsData.data;
        default:
            return state;
    }
}

export default BookingReducer;