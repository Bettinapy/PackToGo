import { connect } from "react-redux";
import { fetchCarrierPost, deleteCarrierPost } from "../../actions/carrier_post_actions";
import {createBooking} from "../../actions/booking_actions";
import { clearErrors } from "../../actions/session_actions";
import CarrierPostShow from './carrier_post_show';
const mapStateToProps = (state, ownProps) => {

  const carrier_post = state.carrier_posts[ownProps.match.params.carrierPostId];
  const currentUserId = typeof state.session.user !== 'undefined'? (typeof state.session.user.id !== "undefined" ? 
    state.session.user.id : -1) : (-1);
  if(typeof carrier_post !==  'undefined'){
    const newDate = new Date(carrier_post.travelDate);
    carrier_post.travelDate = newDate.toJSON().slice(0,10)
  }
  debugger
  return {
    carrier_post: carrier_post || {
      origin: "",
      destination: "",
      travelDate: new Date().toJSON().slice(0, 10),
      fee: 0,
      maxWeight: 0,
      transportaion: "",
      carrierId: 0,
    },
    currentUserId: currentUserId,
    loggedIn: state.session.isAuthenticated ,
    errors: state.errors.session || {
      parcelContents:"",
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCarrierPost: (carrierPostId) => dispatch(fetchCarrierPost(carrierPostId)),
    deleteCarrierPost: (carrierPostId) => dispatch(deleteCarrierPost(carrierPostId)),
    createBooking: (carrierPostId, bookingData) => dispatch(createBooking(carrierPostId, bookingData)),
    clearErrors: () => dispatch(clearErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarrierPostShow);