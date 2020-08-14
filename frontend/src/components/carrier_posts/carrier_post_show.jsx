import React from "react";
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import './carrier_post_show.scss'

class CarrierPostShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parcelContents: "",
      phone: "",
      isOpen: false,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleBooking = this.handleBooking.bind(this);
  }

  toggleModal = (event) => {
    if(!this.props.loggedIn){
      const choice = window.confirm("Please log in or sign up first!");
      if (choice === true) {
        this.props.history.push('/login')
      }
    } else{
      if (this.props.currentUserId === this.props.carrier_post.carrierId){
        alert('You are the creator!')
      } else {

        console.log(event);
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
      }

    }
  };

  handleChange(type) {
    return (e) => {
      this.setState({ [type]: e.target.value });
    };
  }

  handleBooking(e){
    e.preventDefault();
    let bookingData = {};
    bookingData.parcelContents = this.state.parcelContents;
    bookingData.phone = this.state.phone;
    this.props.createBooking(this.props.match.params.carrierPostId, bookingData)
      .then((action) => {

        if(action.bookingData){
          this.props.history.push(`/bookings/${action.bookingData.data._id}`)
        }
      });
  }

  componentDidMount() {
     Modal.setAppElement("body");
    this.props.fetchCarrierPost(this.props.match.params.carrierPostId);
  }

  componentWillMount() {
    this.props.clearErrors();
  }

  handleDelete(e) {
    e.preventDefault();
    const choice = window.confirm("Delete this post?");
    if (choice === true) {
      this.props
        .deleteCarrierPost(this.props.match.params.carrierPostId)
        .then(() => {
          return this.props.history.push("/");
        });
    }
  }
  render() {
    const { isOpen } = this.state;
    const userAuth =
      this.props.currentUserId === this.props.carrier_post.carrierId ? (
        <>
          <div className="user-button-container">
            <Link
                className="user-button" to={`/carriers/posts/${this.props.match.params.carrierPostId}/edit`}
            >
              edit
            </Link>
            <button className="user-button" onClick={this.handleDelete}>delete</button>
          </div>
        </>
      ) : (
        <></>
      );
   
    const parcelContentsErr = this.props.errors.parcelContents ? (
      <div className="popup-booking-form-err">
        <p>{this.props.errors.parcelContents}</p>
      </div>
    ) : (
      <></>
    );
    return (
      <>
        <div className="carrier-post-show-container">
            <div className="carrier-post-header" >
              From {this.props.carrier_post.origin} to {this.props.carrier_post.destination}
            </div>
          <div className="carrier-show-container">
            <div className="carrier-show-col-containter" >
              <h3>Origin</h3>
              <p>{this.props.carrier_post.origin}</p>
              
            </div>
            <div className="carrier-show-col-containter">
              <h3>Destination</h3>
              <p>{this.props.carrier_post.destination}</p>
              
            </div>
            <div className="carrier-show-col-containter">
              <h3>Travel Date</h3>
              <p>{this.props.carrier_post.travelDate}</p>
            
            </div>
            <div className="carrier-show-col-containter">
              <h3>Fee</h3>
              <p>$ {this.props.carrier_post.fee}</p>
            
            </div>

            <div className="carrier-show-col-containter">
              <h3>Max Weight</h3>
              <p>{this.props.carrier_post.maxWeight} lbs</p>
         
            </div>
            <div className="carrier-show-col-containter">
              <h3>Transportation</h3>
              <p>{this.props.carrier_post.transportation}</p>
            </div>

            <div className="carrier-show-col-containter">
                <h3>Carrier</h3>
                <p>{this.props.carrier_post.carrierId}</p>
            </div>
            {userAuth}
            <div className="submit-button-container" >

              <button className="submit-button" onClick={this.toggleModal}>Booking</button>
            </div>
          </div>
        </div>

        <Modal
          id="booking-form"
          isOpen={isOpen}
          closeTimeoutMS={150}
          shouldCloseOnOverlayClick={true}
          onRequestClose={this.toggleModal}
          aria={{
            labelledby: "heading",
            describedby: "fulldescription",
          }}
          className="popup-modal-container"
        >
          <div className="popup-booking-container">
            <h1>Book a carrier</h1>
            <p>Please fill out the following information: </p>
            <div >
              <form onSubmit={this.handleBooking} className="popup-booking-form-container">
              <label className="booking-form-label">
                  <h3>Parcel Content&#42;</h3>
                <input
                  type="text"
                  className="booking-form-input"
                  value={this.state.parcelContents}
                  onChange={this.handleChange("parcelContents")}
                />
              </label>
              {parcelContentsErr}
              <label htmlFor="phone" className="booking-form-label">
                <h3>Phone</h3>
                <input
                  type="text"
                  className="booking-form-input"
                  value={this.state.phone}
                  onChange={this.handleChange("phone")}
                />
              </label>
              <input type="submit" value="Submit booking" />
            </form>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default CarrierPostShow;