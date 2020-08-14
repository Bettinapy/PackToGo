import axios from "axios";
export const getBooking = (bookingId) => {
  return axios.get(`/api/bookings/${bookingId}`);
};