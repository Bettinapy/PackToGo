import React from "react";
import './shipper_post_create.scss';

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
      <p className="create-form-error">{this.props.errors.origin}</p>
    ) : (<p className="hidden">hidden</p>))

    const destinationErr = (this.props.errors.destination ? (
      <p className="create-form-error">{this.props.errors.destination}</p>
    ) : (<p className="hidden">hidden</p>))

    const parcelContentsErr = (this.props.errors.parcelContents ? (
      <p className="create-form-error">{this.props.errors.parcelContents}</p>
    ) : (<p className="hidden">hidden</p>))

    const maxWeightErr = (this.props.errors.maxWeight ? (
      <p className="create-form-error">{this.props.errors.maxWeight}</p>
    ) : (<p className="hidden">hidden</p>))

    return (
      <div className="shipper-post-create-container">
        <div className="shipper-post-banner-container">
          <img
            className="shipper-post-create-banner-photo"
            src="https://poblano-app-seeds.s3.amazonaws.com/bike.jpg"
            alt="bike-pic"
          />
          <div className="shipper-post-create-banner-photo"></div>
          <span className="shipper-post-create-banner-heading">
            Find a traveler who can deliver.
          </span>
        </div>
        <div className="shipper-post-create-form-container">
          <div className="create-form-container">
            <div className="create-form-inner-container">
              <form onSubmit={this.handleSubmit}>
                <div className="create-post-form-wrapper">
                  <label className="post-form-label" htmlFor="origin">
                    Origin&#42;
                    <input
                      type="text"
                      value={this.state.origin}
                      onChange={this.handleChange("origin")}
                    />
                  </label>
                  {originErr}

                  <label className="post-form-label" htmlFor="destination">
                    Destination&#42;
                    <input
                      type="text"
                      value={this.state.destination}
                      onChange={this.handleChange("destination")}
                    />
                  </label>
                  {destinationErr}

                  <label className="post-form-label" htmlFor="parcel-contents">
                    Parcel Contents&#42;
                    <input
                      type="text"
                      value={this.state.parcelContents}
                      onChange={this.handleChange("parcelContents")}
                    />
                  </label>
                  {parcelContentsErr}

                  <label className="post-form-label" htmlFor="max-weight">
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

export default ShipperPostForm;
