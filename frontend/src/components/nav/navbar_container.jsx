import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import { fetchBookings } from "../../actions/booking_actions";
import NavBar from "./navbar";

const mapStateToProps = (state) => {
    return ({
        loggedIn: state.session.isAuthenticated, 
        currentUser: state.session.user
    })
};

const mapDispatchToProps = dispatch => {
    return ({
        logout: () => dispatch(logout()),
        fetchBookings: (role, userId) => dispatch(fetchBookings(role, userId))
    })
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
