import { connect } from "react-redux";
import { login, signUp } from "../../actions/session_actions";
import LoginForm from "./login_form";
import { fetchBookings } from '../../actions/booking_actions';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    signUp: (user) => dispatch(signUp(user)),
    fetchBookings: (role, userId) => dispatch(fetchBookings(role, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);