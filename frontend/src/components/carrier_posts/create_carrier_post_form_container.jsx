import { connect } from "react-redux";
import { createCarrierPost } from '../../actions/carrier_post_actions';
import { clearErrors } from '../../actions/session_actions';
import CarrierPostForm from './carrier_post_form';

const mapStateToProps = (state, ownProps) => {
  debugger
  return {
    carrier_post: Object.values(state.carrier_posts)[0] || {
      origin: "",
      destination: "",
      travelDate: new Date().toJSON().slice(0, 10),
      fee: 0,
      parcelContents: "",
      maxWeight: 0,
      transportation: "flight",
      carrierId: state.session.user.id,
    },
    errors: state.errors.session || {
      origin: "",
      destination: "",
      parcelContents: "",
      travelDate: "",
      fee: "",
      maxWeight:""
    },
    formType: "Create Carrier Post",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitCarrierForm: (carrierPost) => dispatch(createCarrierPost(carrierPost)),
    clearErrors: () => dispatch(clearErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarrierPostForm);