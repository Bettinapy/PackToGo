import React from "react";
import { Link } from "react-router-dom";

class CarrierPostListItem extends React.Component{
    render(){
        return (
          <div>
            <Link to={`/carriers/posts/${this.props.carrier_post._id}`}>
              <div>
                From {this.props.carrier_post.origin} to {this.props.carrier_post.destination}
              </div>
              <div>Travel date: {this.props.carrier_post.travel_date}</div>
            </Link>
          </div>
        );
    }
}

export default CarrierPostListItem;