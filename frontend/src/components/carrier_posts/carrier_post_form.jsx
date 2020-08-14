import React from "react";
import './carrier_post_create.scss';

class CarrierPostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.carrier_post;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
   
    this.props
      .submitCarrierForm(this.state)
      .then((action) => {
       ;
        return this.props.history.push(
          `/carriers/posts/${action.carrierPost.data._id}`
        );
      })
      .catch((err) => console.log(err));
  }

  handleChange(type) {
    return (e) => {
      this.setState({ [type]: e.target.value });
    };
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  // will use Google Map Autocomplete later
  render() {
    const originErr = (this.props.errors.origin ? (
      <p className="create-form-error">{this.props.errors.origin}</p>
    ) : (<p className="hidden">hidden</p>))

    const destinationErr = (this.props.errors.destination ? (
      <p className="create-form-error">{this.props.errors.destination}</p>
    ) : (<p className="hidden">hidden</p>))

    const travelDateErr = (this.props.errors.travelDate ? (
      <p className="create-form-error">{this.props.errors.travelDate}</p>
    ) : (<p className="hidden">hidden</p>))

    const transportErr = (this.props.errors.transportation ? (
      <p className="create-form-error">{this.props.errors.travelDate}</p>
    ) : (<p className="hidden">hidden</p>))

    const feeErr = (this.props.errors.fee ? (
      <p className="create-form-error">{this.props.errors.fee}</p>
    ) : (<p className="hidden">hidden</p>))

    const maxWeightErr = (this.props.errors.maxWeight ? (
      <p className="create-form-error">{this.props.errors.maxWeight}</p>
    ) : (<p className="hidden">hidden</p>))
   
    return (
      <div className="carrier-post-create-container">
        <div className="carrier-post-banner-container">
          <img
            className="carrier-post-create-banner-photo"
            src="https://poblano-app-seeds.s3.amazonaws.com/flight.jpg"
            alt="flight-pic"
          />
          <div className="carrier-post-create-banner-photo"></div>
          <span className="carrier-post-create-banner-heading">
            Let a shipper know you're traveling
          </span>
        </div>
        <div className="carrier-post-create-form-container">
          <div className="create-form-container">
            <div className="create-form-inner-container">
                <form onSubmit={this.handleSubmit}>
                <div className="create-post-form-wrapper">
                    <label 
                      className="post-form-label"
                      htmlFor="origin">
                      Origin&#42;
                      <input
                        className="post-form-input"
                        type="text"
                        value={this.state.origin}
                        onChange={this.handleChange("origin")}
                      />
                    </label>
                  {originErr}

                  <label 
                    className="post-form-label"
                    htmlFor="destination">
                    Destination&#42;
                    <input
                      type="text"
                      value={this.state.destination}
                      onChange={this.handleChange("destination")}
                    />
                  </label>
                  {destinationErr}

                  <label 
                    className="post-form-label"
                    htmlFor="travel-date">
                    Travel Date&#42;
                    <input
                      type="date"
                      id="travel-date"
                      min="2020-08-11"
                      value={this.state.travelDate}
                      onChange={this.handleChange("travelDate")}
                    ></input>
                  </label>
                  {travelDateErr}

                  <label 
                    className="post-form-label"
                    htmlFor="transportation">
                    Transportation&#42;
                    <select
                      id="transportation"
                      onChange={this.handleChange("transportation")}
                    >
                      <option
                        value="flight"
                        onClick={this.update("transportation")}
                        defaultValue
                      >
                        flight
                      </option>
                      <option
                        value="car"
                        name="transportation"
                        onClick={this.update("transportation")}
                      >
                        car
                      </option>
                      <option
                        value="train"
                        name="transportation"
                        onClick={this.update("transportation")}
                      >
                        train
                      </option>
                      <option
                        value="subway"
                        name="transportation"
                        onClick={this.update("transportation")}
                      >
                        subway
                      </option>
                      <option
                        value="bus"
                        name="transportation"
                        onClick={this.update("transportation")}
                      >
                        bus
                      </option>
                    </select>
                  </label>
                  {transportErr}
                  <label 
                    className="post-form-label"
                    htmlFor="fee">
                    Fee&#42;($)
                    <input
                      type="number"
                      min="1"
                      step="any"
                      value={this.state.fee}
                      onChange={this.handleChange("fee")}
                    />
                  </label>
                  {feeErr}

                  <label 
                    className="post-form-label"
                    htmlFor="max-weight">
                    Max Weight&#42;(g)
                    <input
                      type="number"
                      min="1"
                      step="any"
                      value={this.state.maxWeight}
                      onChange={this.handleChange("maxWeight")}
                    />
                  </label>
                  {maxWeightErr}
                  <input type="submit" value="submit" />
                  </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CarrierPostForm;
