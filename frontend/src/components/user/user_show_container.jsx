import { connect } from 'react-redux';
import UserShow from './user_show';
import { fetchBookings } from '../../actions/booking_actions';
import { fetchUserShipperPosts } from '../../actions/shipper_post_actions';
import { fetchUserCarrierPosts } from '../../actions/carrier_post_actions';

const mapStateToProps = (state) => {

    const currentUserRole = (typeof state.session.user !== "undefined" ? (
        typeof state.session.user.role !== "undefined" ?
            (state.session.user.role) : ("shipper"))
        : (''));
        debugger;

    return {
        currentUserRole: currentUserRole,
        loggedIn: state.session.isAuthenticated,
        currentUser: state.session.user,
        bookings: state.bookings,
        userShipperPosts: Object.values(state.shipper_posts) || [],
        userCarrierPosts: Object.values(state.carrier_posts) || []
    }
};


const mapDispatchToProps = (dispatch) => {
    return ({
        fetchBookings: (role, userId) => dispatch(fetchBookings(role, userId)),
        fetchUserShipperPosts: (userId) => dispatch(fetchUserShipperPosts(userId)),
        fetchUserCarrierPosts: (userId) => dispatch(fetchUserCarrierPosts(userId))
    })
};

export default connect(mapStateToProps, mapDispatchToProps)(UserShow);

