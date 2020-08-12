import React from 'react';
import { connect } from "react-redux";
import { updateShipperPost, fetchShipperPost } from "../../actions/shipper_post_actions";
import { clearErrors } from "../../actions/session_actions";
import ShipperPostForm from "./shipper_post_form";


const mapStateToProps = (state, ownProps) => {
  const shipper_post = state.shipper_posts[ownProps.match.params.shipperPostId];

  return {
    shipper_post: shipper_post,
    errors: state.errors.session || {
      origin: "",
      destination: "",
      parcelContents: "",
      maxWeight: ""
    },
    formType: "Update Shipper Post",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestShipperPost: (shipperPostId) => dispatch(fetchShipperPost(shipperPostId)),
    submitShipperForm: (shipperPost) => dispatch(updateShipperPost(shipperPost)),
    clearErrors: () => dispatch(clearErrors()),
  };
};

class EditShipperPostForm extends React.Component {
  componentDidMount() {
    return this.props.requestShipperPost(this.props.match.params.shipperPostId);
  }
  render() {
    const {
      history,
      match,
      shipper_post,
      errors,
      formType,
      submitShipperForm,
      clearErrors,
    } = this.props;

    if (!shipper_post) return null;

    return (
      <ShipperPostForm
        errors={errors}
        shipper_post={shipper_post}
        formType={formType}
        history={history}
        match={match}
        submitShipperForm={submitShipperForm}
        clearErrors={clearErrors}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditShipperPostForm);