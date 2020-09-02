import React from 'react';
import './user.scss';
import { BookingIndexListItem } from '../bookings/booking_index_list_item';
import ShipperPostListItem from '../shipper_posts/shipper_post_list_item';
import CarrierPostListItem from '../carrier_posts/carrier_post_list_item';

class UserShow extends React.Component {
    constructor(props) {
        super(props);
        this.currentUser = this.props.currentUser;
        this.currentUserRole = this.props.currentUserRole;
        this.loggedIn = this.props.loggedIn;
        this.renderPosts = this.renderPosts.bind(this);
        this.displayBookings = this.displayBookings.bind(this);
        this.displayPosts = this.displayPosts.bind(this);
    }
    
    componentDidMount() {
        this.props.fetchBookings(this.currentUserRole, this.currentUser.id);
        if (this.currentUserRole === "shipper") {
            this.props.fetchUserShipperPosts(this.currentUser.id);
        } else {
            this.props.fetchUserCarrierPosts(this.currentUser.id)
        }
    }

    renderPosts() {
        let userShipperPostList = null;
        if (this.props.userShipperPosts instanceof Array) {
            userShipperPostList = this.props.userShipperPosts.map(shipperPost => {
                return <ShipperPostListItem key={shipperPost._id} shipper_post={shipperPost} />
            });
        }

        let userCarrierPostList = null;
        if (this.props.userCarrierPosts instanceof Array) {
            userCarrierPostList = this.props.userCarrierPosts.map(carrierPost => {
                return <CarrierPostListItem key={carrierPost._id} carrier_post={carrierPost} />
            });
        }

        if (this.currentUserRole === "shipper") {
            return userShipperPostList;
        } else {
            return userCarrierPostList;
        }
    }

    displayBookings(e) {
        e.preventDefault();
        document.getElementById('bookingsDropdown').classList.toggle('show');
    }

    displayPosts(e) {
        e.preventDefault();
        document.getElementById('postsDropdown').classList.toggle('show');
    }

    render() {
    
        let bookingsList = null;
        if (this.props.bookings instanceof Array) {
            bookingsList = this.props.bookings.map(booking => {
                return <BookingIndexListItem key={booking._id} booking={booking} currentUserRole={this.currentUserRole}/>
            });
        }

        debugger;
        return (
            <div className="user-container">
                <div className="user-profile-container">
                    <img className="profile-pic" src="https://poblano-app-seeds.s3.amazonaws.com/blankprofile.png" alt="blank profile"/>
                    <div className="user-profile-information">
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
                    </div>
                </div>
                <div className="dropdown-container">
                    <div className="dropdown">
                        <button className="drop-button" onClick={this.displayBookings}>Your Bookings</button>
                        <div className="dropdown-content" id="bookingsDropdown">
                            {bookingsList}
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="drop-button" onClick={this.displayPosts}>Your Posts</button>
                        <div className="dropdown-content" id="postsDropdown">
                            {this.renderPosts()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default UserShow;