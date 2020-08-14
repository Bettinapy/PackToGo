import React from "react";
import { Link } from "react-router-dom";
import './booking_show.scss'
class BookingShow extends React.Component {
  componentDidMount() {
    this.props.fetchBooking(this.props.match.params.bookingId);
  }

  componentWillMount() {
    this.props.clearErrors();
  }

  render() {
      return (
        <div className="booking-container">
          <div className="booking-show-container">

            <div className="booking-info-container">
              <h3>Thanks {this.props.currentUser.handle}!</h3>
              <h2>Your booking is confirmed</h2>
            </div>
            <div>
              Parcel Contents Include: <p>{this.props.booking.parcelContents}</p>
            </div>
            <div>
              <Link to="/" >Return to home page</Link>
            </div>
          </div>
        </div>
      );
  }
}

export default BookingShow;