import { connect } from "react-redux";
import { createCarrierPost } from '../../actions/carrier_post_actions';
import { clearErrors } from '../../actions/session_actions';
import CarrierPostForm from './carrier_post_form';

const mapStateToProps = (state, ownProps) => {
  return {
    carrier_post: state.carrier_posts[ownProps.match.params.carrierPostId] || {
      origin: "",
      destination: "",
      travel_date: new Date().toJSON().slice(0, 10),
      fee: 0,
      parcel_contents: "",
      max_weight: 0,
      transportaion: "",
      carrier_id: state.session.user.id,
    },
    errors: state.errors.session.session_error || {
      origin: "",
      destination: "",
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