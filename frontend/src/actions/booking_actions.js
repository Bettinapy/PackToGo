import * as CarrierPostUtil from "../util/carrier_post_util";
import * as BookingUtil from "../util/booking_util";
import { receiveSessionErrors } from "./session_actions";

export const RECEIVE_BOOKING = "RECEIVE_BOOKING";

export const receiveBooking = (bookingData) => {
  return {
    type: RECEIVE_BOOKING,
    bookingData,
  };
};


export const fetchBooking = (bookingId) => {
  return dispatch => {
    return BookingUtil.getBooking(bookingId)
      .then((payload) => dispatch(receiveBooking(payload)),
            (err) => dispatch(receiveSessionErrors(err.response.data)) )
  }
}


export const createBooking = (carrierPostId, bookingData) => {
  return (dispatch) => {
    return CarrierPostUtil.createBooking(carrierPostId, bookingData).then(
      (booking) => dispatch(receiveBooking(booking)),
      (err) => dispatch(receiveSessionErrors(err.response.data))
    );
        
  };
};