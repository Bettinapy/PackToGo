import { connect } from "react-redux";
import { fetchCarrierPost, deleteCarrierPost } from "../../actions/carrier_post_actions";
import { clearErrors } from "../../actions/session_actions";
import CarrierPostShow from './carrier_post_show';
const mapStateToProps = (state, ownProps) => {
  debugger
  const carrier_post = state.carrier_posts[ownProps.match.params.carrierPostId];
  const currentUserId = typeof state.session.user.id !== "undefined" ? 
    state.session.user.id : -1;

  return {
    carrier_post: carrier_post || {
      origin: "",
      destination: "",
      travelDate: new Date().toJSON().slice(0, 10),
      fee: 0,
      parcelContents: "",
      maxWeight: 0,
      transportaion: "",
      carrierId: 0,
    },
    currentUserId: currentUserId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCarrierPost: (carrierPostId) => dispatch(fetchCarrierPost(carrierPostId)),
    deleteCarrierPost: (carrierPostId) => dispatch(deleteCarrierPost(carrierPostId)),
    clearErrors: () => dispatch(clearErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarrierPostShow);