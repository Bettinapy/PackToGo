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
            <div className="booking-info-show-container">
              <div className="booking-info-small-container">
                <h3>Origin: </h3>
                <p>{this.props.booking.origin}</p>
              </div>
              <div className="booking-info-small-container">
                <h3>Destination:</h3>
                <p>{this.props.booking.destination}</p>
              </div>
              <div className="booking-info-small-container">
                <h3>Travel Date:</h3>
                <p>{this.props.booking.travelDate }</p>
              </div>
              <div className="booking-info-small-container">
                <h3>Transportation:</h3>
                <p>{this.props.booking.transportation}</p>
              </div>
              <div className="booking-info-small-container">
                <h3>Fee:</h3>
                <p>$ {this.props.booking.fee}</p>
              </div>
              <div className="booking-info-small-container">
                <h3>Parcel Contents: </h3>
                <p>{this.props.booking.parcelContents}</p>
              </div>
              <div className="booking-info-small-container">
                <Link to="/">Return to home page</Link>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default BookingShow;