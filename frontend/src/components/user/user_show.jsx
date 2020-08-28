import React from 'react';
import './user.scss';
import { BookingIndexListItem } from '../bookings/booking_index_list_item';
import ShipperPostListItem from '../shipper_posts/shipper_post_list_item';

class UserShow extends React.Component {
    constructor(props) {
        super(props);
        this.currentUser = this.props.currentUser;
        this.currentUserRole = this.props.currentUserRole;
        this.loggedIn = this.props.loggedIn;
    }
    
    componentDidMount() {
        this.props.fetchBookings(this.currentUserRole, this.currentUser.id);
        this.props.fetchUserShipperPosts(this.currentUser.id);
    }

    render() {
    
        let bookingsList = null;
        if (this.props.bookings instanceof Array) {
            bookingsList = this.props.bookings.map(booking => {
                return <BookingIndexListItem key={booking._id} booking={booking} />
            });
        }
        let userShipperPostList = null;
        if (this.props.userShipperPosts instanceof Array) {
            userShipperPostList = this.props.userShipperPosts.map(shipperPost => {
                return <ShipperPostListItem key={shipperPost._id} shipper_post={shipperPost} />
            });
        }

        debugger;
        return (
            <div className="user-container">
                <img className="profile-pic" src="https://poblano-app-seeds.s3.amazonaws.com/blankprofile.png" alt="blank profile"/>
                <h1>Profile Information</h1>
                <div>
                   Username: {this.currentUser.handle}
                </div>
                <div>
                   Email: {this.currentUser.email}
                </div>
                <div>
                    Current Role: {this.currentUser.role}
                </div>
                <br/>
                {/* <div className="carrier-post-message-container">
                    <div className="carrier-post-pic-message"></div>
                </div> */}
                <h1>Your Bookings</h1>
                <div className="carrier-list-container">
                    {bookingsList}
                </div>
                <h1>Your Posts</h1>
                <div className="carrier-list-container">
                    {userShipperPostList}
                </div>
            </div>
        )
    }
};

export default UserShow;