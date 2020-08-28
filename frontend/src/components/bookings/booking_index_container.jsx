import { connect } from 'react-redux';
import BookingsIndex from './booking_index';

const mapStateToProps = (state) => {
    return ({
        bookings: state.bookings
    })
};

const mapDispatchToProps = (dispatch) => {
    return ({
        
    })
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingsIndex);