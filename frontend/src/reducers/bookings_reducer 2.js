import {RECEIVE_BOOKING} from '../actions/booking_actions';

const BookingReducer = (state={}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);

    switch(action.type){
        case RECEIVE_BOOKING:
            return action.bookingData.data;
        default:
            return state;
    }
}

export default BookingReducer;