import React from "react";
import { Link } from "react-router-dom";
import Modal from 'react-modal';

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
      alert('Please log in / sign up first!')
    } else{
      console.log(event);
      const { isOpen } = this.state;
      this.setState({ isOpen: !isOpen });

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
        debugger
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
          return this.props.history.push("/carriers/posts");
        });
    }
  }
  render() {
    const { isOpen } = this.state;
    const userAuth =
      this.props.currentUserId === this.props.carrier_post.carrierId ? (
        <>
          <button>
            <Link
              to={`/carriers/posts/${this.props.match.params.carrierPostId}/edit`}
            >
              edit
            </Link>
          </button>
          <button onClick={this.handleDelete}>delete</button>
        </>
      ) : (
        <></>
      );
   
    const parcelContentsErr = this.props.errors.parcelContents ? (
      <p>{this.props.errors.parcelContents}</p>
    ) : (
      <></>
    );
    return (
      <>
        <div>
          <div className="carrier-post-show-container">
            <div>
              <h3>Origin</h3>
              <p>{this.props.carrier_post.origin}</p>
              
            </div>
            <div>
              <h3>Destination</h3>
              <p>{this.props.carrier_post.destination}</p>
              
            </div>
            <div>
              <h3>Travel Date</h3>
              <p>{this.props.carrier_post.travelDate}</p>
            
            </div>
            <div>
              <h3>fee</h3>
              <p>{this.props.carrier_post.fee}</p>
            
            </div>

            <div>
              <h3>Max Weight</h3>
              <p>{this.props.carrier_post.maxWeight}</p>
         
            </div>
            <div>
              <h3>Transportation</h3>
              <p>{this.props.carrier_post.transportation}</p>
            </div>
            <div>
                <p>Carrier</p>
                <p>{this.props.carrier_post.carrierId}</p>
            </div>
            {userAuth}
          </div>
          <div>
            <h3>Transportation</h3>
            <p>{this.props.carrier_post.transportation}</p>
          </div>
          <div>
            <p>Carrier</p>
            <p>{this.props.carrier_post.carrierId}</p>
          </div>
          {userAuth}
          <button onClick={this.toggleModal}>Booking</button>
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
        >
          <div>
            <h1>Book a carrier</h1>
            <p>Please fill out the following information: </p>
            <form onSubmit={this.handleBooking}>
              <label>
                Parcel Content&#42;
                <input
                  type="text"
                  value={this.state.parcelContents}
                  onChange={this.handleChange("parcelContents")}
                />
              </label>
              {parcelContentsErr}
              <label htmlFor="phone">
                Phone
                <input
                  type="text"
                  value={this.state.phone}
                  onChange={this.handleChange("phone")}
                />
              </label>
              <input type="submit" value="Submit booking" />
            </form>
          </div>
        </Modal>
      </>
    );
  }
}

export default CarrierPostShow;