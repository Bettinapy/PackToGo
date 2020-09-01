import * as CarrierPostUtil from "../util/carrier_post_util";
import * as ShipperPostUtil from "../util/shipper_post_util";
import * as BookingUtil from "../util/booking_util";
import { receiveSessionErrors } from "./session_actions";

export const RECEIVE_BOOKING = "RECEIVE_BOOKING";
export const RECEIVE_BOOKINGS = "RECEIVE_BOOKINGS";

export const receiveBooking = (bookingData) => {
  return {
    type: RECEIVE_BOOKING,
    bookingData,
  };
};

export const receiveBookings = (bookingsData) => {
  return {
    type: RECEIVE_BOOKINGS,
    bookingsData
  };
};


export const fetchBooking = (bookingId) => {
  return dispatch => {
    return BookingUtil.getBooking(bookingId)
      .then((payload) => dispatch(receiveBooking(payload)),
            (err) => dispatch(receiveSessionErrors(err.response.data)) )
  }
}

export const fetchBookings = (role, userId) => {
  return dispatch => {
    debugger;
    return BookingUtil.getBookings(role, userId)
      .then((payload) => dispatch(receiveBookings(payload)),
          (err) => dispatch(receiveSessionErrors(err.response.data)))
  }
}


export const createBooking = (type, postId, bookingData) => {
  return (dispatch) => {
    if (type === "carrierPost") {
      return CarrierPostUtil.createBooking(postId, bookingData)
        .then(
          (booking) => dispatch(receiveBooking(booking)),
          (err) => dispatch(receiveSessionErrors(err.response.data))
        );
    } else {
      return ShipperPostUtil.createBooking(postId)
        .then(
          (booking) => dispatch(receiveBooking(booking)),
          (err) => dispatch(receiveSessionErrors(err.response.data))
        );
    }
  };
};