import React from "react";

class CarrierPostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.carrier_post;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    debugger
    this.props
      .submitCarrierForm(this.state)
      .then((action) => {
        debugger;
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
      <p>{this.props.errors.origin}</p>
    ) : (<></>))

    const destinationErr = (this.props.errors.destination ? (
      <p>{this.props.errors.destination}</p>
    ) : (<></>))

    const parcelContentsErr = (this.props.errors.parcelContents ? (
      <p>{this.props.errors.parcelContents}</p>
    ) : (<></>))

    const travelDateErr = (this.props.errors.travelDate ? (
      <p>{this.props.errors.travelDate}</p>
    ) : (<></>))

    const feeErr = (this.props.errors.fee ? (
      <p>{this.props.errors.fee}</p>
    ) : (<></>))

    const maxWeightErr = (this.props.errors.maxWeight ? (
      <p>{this.props.errors.maxWeight}</p>
    ) : (<></>))

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="origin">
          Origin
          <input
            type="text"
            value={this.state.origin}
            onChange={this.handleChange("origin")}
          />
        </label>
        {originErr}

        <label htmlFor="destination">
          Destination
          <input
            type="text"
            value={this.state.destination}
            onChange={this.handleChange("destination")}
          />
        </label>
        {destinationErr}

        <label htmlFor="travel-date">
          {" "}
          Travel Date
          <input
            type="date"
            id="travel-date"
            min="2020-08-11"
            value={this.state.travelDate}
            onChange={this.handleChange("travelDate")}
          ></input>
        </label>
        {travelDateErr}

        <label htmlFor="transportation">
          transportation
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

        <label htmlFor="fee">
          fee
          <input
            type="number"
            min="1"
            step="any"
            value={this.state.fee}
            onChange={this.handleChange("fee")}
          />
        </label>
        {feeErr}

        <label htmlFor="parcel-contents">
          Parcel Contents
          <input
            type="text"
            value={this.state.parcelContents}
            onChange={this.handleChange("parcelContents")}
          />
        </label>
        {parcelContentsErr}

        <label htmlFor="max-weight">
          Max Weight
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
      </form>
    );
  }
}

export default CarrierPostForm;
