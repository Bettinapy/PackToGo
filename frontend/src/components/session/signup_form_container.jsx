import { connect } from "react-redux";
import { signUp, login } from "../../actions/session_actions";
import SignupForm from "./signup_form";

const mapStateToProps = (state) => {
  return {
    signedIn: state.session.isSignedIn,
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (user) => dispatch(signUp(user)),
    login: (user) => dispatch(login(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);