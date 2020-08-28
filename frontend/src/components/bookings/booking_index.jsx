import React from 'react';
import { BookingIndexListItem } from './booking_index_list_item';

class BookingsIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props;
    }

    render() {

        const bookingsList = this.props.bookings.map(booking => {
            return <BookingIndexListItem key={booking.id} booking={booking}/>
        });

        return (
            <div>
                <div className="carrier-post-message-container">
                    <div className="carrier-post-pic-message"></div>
                    <span className="carrier-post-banner-heading">
                        Check out all your bookings.
                    </span>
                </div>
                <div className="carrier-list-container">
                    {bookingsList}
                </div>
            </div>
        );
    }
};

export default BookingsIndex;