import { connect } from "react-redux";
import { fetchShipperPost, deleteShipperPost } from "../../actions/shipper_post_actions";
import { clearErrors } from "../../actions/session_actions";
import ShipperPostShow from './shipper_post_show';
const mapStateToProps = (state, ownProps) => {
  debugger
  const shipper_post = state.shipper_posts[ownProps.match.params.shipperPostId];
  const currentUserId = typeof state.session.user.id !== "undefined" ? 
    state.session.user.id : -1;
  debugger
  return {
    shipper_post: shipper_post || {
      origin: "",
      destination: "",
      parcelContents: "",
      maxWeight: 0,
      shipperId: 0,
    },
    currentUserId: currentUserId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchShipperPost: (shipperPostId) => dispatch(fetchShipperPost(shipperPostId)),
    deleteShipperPost: (shipperPostId) => dispatch(deleteShipperPost(shipperPostId)),
    clearErrors: () => dispatch(clearErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShipperPostShow);