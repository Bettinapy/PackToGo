import { connect } from "react-redux";
import { createShipperPost } from '../../actions/shipper_post_actions';
import { clearErrors } from '../../actions/session_actions';
import ShipperPostForm from './shipper_post_form';

const mapStateToProps = (state, ownProps) => {

  return {
    shipper_post: Object.values(state.shipper_posts)[0] || {
      origin: "",
      destination: "",
      parcelContents: "",
      maxWeight: 500,
      shipperId: state.session.user.id,
    },
    errors: state.errors.session || {
      origin: "",
      destination: "",
      parcelContents: "",
      maxWeight:""
    },
    formType: "Create Shipper Post",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitShipperForm: (shipperPost) => dispatch(createShipperPost(shipperPost)),
    clearErrors: () => dispatch(clearErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShipperPostForm);