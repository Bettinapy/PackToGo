import React from 'react';
import { connect } from "react-redux";
import { updateCarrierPost, fetchCarrierPost } from "../../actions/carrier_post_actions";
import { clearErrors } from "../../actions/session_actions";
import CarrierPostForm from "./carrier_post_form";


const mapStateToProps = (state, ownProps) => {
  const carrier_post = state.carrier_posts[ownProps.match.params.carrierPostId];
  if (typeof carrier_post !== 'undefined') {
    const newDate = new Date(carrier_post.travelDate);
    carrier_post.travelDate  = newDate.toJSON().slice(0, 10);
  }
  debugger
  return {
    carrier_post: carrier_post,
    errors: state.errors.session || {
      origin: "",
      destination: "",
      parcelContents: "",
      travelDate: "",
      fee: "",
      maxWeight: ""
    },
    formType: "Update Carrier Post",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestCarrierPost: (carrierPostId) => dispatch(fetchCarrierPost(carrierPostId)),
    submitCarrierForm: (carrierPost) => dispatch(updateCarrierPost(carrierPost)),
    clearErrors: () => dispatch(clearErrors()),
  };
};

class EditCarrierPostForm extends React.Component {
  componentDidMount() {
    return this.props.requestCarrierPost(this.props.match.params.carrierPostId);
  }
  render() {
    const {
      history,
      match,
      carrier_post,
      errors,
      formType,
      submitCarrierForm,
      clearErrors,
    } = this.props;

    if (!carrier_post) return null;

    return (
      <CarrierPostForm
        errors={errors}
        carrier_post={carrier_post}
        formType={formType}
        history={history}
        match={match}
        submitCarrierForm={submitCarrierForm}
        clearErrors={clearErrors}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCarrierPostForm);