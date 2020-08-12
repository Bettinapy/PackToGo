import React from "react";

class ShipperPostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.shipper_post;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props
      .submitShipperForm(this.state)
      .then((action) => {
    ;
        return this.props.history.push(
          `/shippers/posts/${action.shipperPost.data._id}`
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

    const maxWeightErr = (this.props.errors.maxWeight ? (
      <p>{this.props.errors.maxWeight}</p>
    ) : (<></>))

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="origin">
          Origin&#42;
          <input
            type="text"
            value={this.state.origin}
            onChange={this.handleChange("origin")}
          />
        </label>
        {originErr}

        <label htmlFor="destination">
          Destination&#42;
          <input
            type="text"
            value={this.state.destination}
            onChange={this.handleChange("destination")}
          />
        </label>
        {destinationErr}

        <label htmlFor="parcel-contents">
          Parcel Contents&#42;
          <input
            type="text"
            value={this.state.parcelContents}
            onChange={this.handleChange("parcelContents")}
          />
        </label>
        {parcelContentsErr}

        <label htmlFor="max-weight">
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
      </form>
    );
  }
}

export default ShipperPostForm;
