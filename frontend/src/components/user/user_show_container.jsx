import { connect } from 'react-redux';
import UserShow from './user_show';
import { fetchBookings } from '../../actions/booking_actions';

const mapStateToProps = (state) => {
    return {
        currentUserRole: currentUserRole,
        loggedIn: state.session.isAuthenticated
    }
};


const mapDispatchToProps = (state) => {
    return ({
        fetchBookings: (role, userId) => dispatch(fetchBookings(role, userId))
    })
};

export default connect(mapStateToProps, mapDispatchToProps)(UserShow);

