import axios from "axios";

export const getBooking = (bookingId) => {
  return axios.get(`/api/bookings/${bookingId}`);
};

export const getBookings = (role, userId) => {
  return axios.get(`/api/bookings/${role}/${userId}`);
};

