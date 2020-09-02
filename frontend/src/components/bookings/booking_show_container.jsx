import { connect } from "react-redux";
import {fetchBooking} from '../../actions/booking_actions';
import { clearErrors } from "../../actions/session_actions";
import BookingShow from './booking_show';

const mapStateToProps = (state, ownProps) => {
    const booking = state.bookings;
    const currentUser =
      typeof state.session.user !== "undefined" ? state.session.user : {};
    if (typeof booking.travelDate !== "undefined") {
      const newDate = new Date(booking.travelDate);
      booking.travelDate = newDate.toJSON().slice(0, 10);
    }
    return{
        booking: booking || {
            origin:'',
            destination:'',
            travelDate:'',
            transportation:'',
            fee:'',
            maxWeight:'',
            parcelContents: "",
          },
        currentUser,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      fetchBooking: (bookingId) => dispatch(fetchBooking(bookingId)),
      clearErrors: () => dispatch(clearErrors()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingShow);