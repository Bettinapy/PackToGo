import { connect } from "react-redux";
import { fetchCarrierPost, deleteCarrierPost } from "../../actions/carrier_post_actions";
import { clearErrors } from "../../actions/session_actions";

const mapStateToProps = (state, ownProps) => {
  const carrier_post = state.carrier_posts[ownProps.match.params.carrierPostId];
  const currentUserId = Boolean(state.session.user.id)
    ? state.session.user.id
    : -1;

  return {
    carrier_post: carrier_post || {
      origin: "",
      destination: "",
      travel_date: new Date().toJSON().slice(0, 10),
      fee: 0,
      parcel_contents: "",
      max_weight: 0,
      transportaion: "",
      carrier_id: 0,
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