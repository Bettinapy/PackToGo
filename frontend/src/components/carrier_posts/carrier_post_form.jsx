import React from "react";

class CarrierPostForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.props.carrier_post;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
      e.preventDefault();
      this.props.submitCarrierForm(this.state).then((action) => {
        return this.props.history.push('/');
      });
  }

  handleChange(type) {
    return (e) => {
      this.setState({ [type]: e.target.value });
    };
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  // will use Google Map Autocomplete later
  render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="origin">Origin
            <input
                type="text"
                value={this.state.origin}
                onChange={this.handleChange("origin")}
            />
          </label>

          <label htmlFor="destination">Destination
            <input
                type="text"
                value={this.state.destination}
                onChange={this.handleChange("destination")}
            />
          </label>
         
          <label htmlFor="travel-date"> Travel Date
            <input 
                type="date" 
                id="travel-date" 
                min="2020-08-11"
                value={this.state.travel_date}>
            </input>
          </label>

          <label htmlFor="transportation">transportation
          <select id="transportation">
            <option value="flight" selected>
              flight
            </option>
            <option value="car" onClick={this.handleChange("transportation")}>
              car
            </option>
            <option value="ship" onClick={this.handleChange("transportation")}>
              ship
            </option>
            <option
              value="subway"
              onClick={this.handleChange("transportation")}
            >
              {" "}
              subway{" "}
            </option>
            <option value="bus" onClick={this.handleChange("transportation")}>
              {" "}
              bus{" "}
            </option>
          </select>
          </label>
          <label htmlFor="fee">fee
          <input
            type="number"
            min="1"
            step="any"
            value={this.state.fee}
            onChange={this.handleChange("fee")}
          />
          </label>
          <label htmlFor="parcel-contents">Parcel Contents
          <input
            type="text"
            value={this.state.parcel_contents}
            onChange={this.handleChange("parcel_contents")}
          />
          </label>
          <label htmlFor="max-weight">Max Weight
          <input
            type="number"
            min="1"
            step="any"
            value={this.state.max_weight}
            onChange={this.handleChange("max_weight")}
          />
          </label>
          <input type="submit" value="submit" />
        </form>
      );
  }
}

export default CarrierPostForm;
