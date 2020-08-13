import React from "react";
import { Link } from "react-router-dom";

class CarrierPostListItem extends React.Component{
    render(){
      let travelDate = this.props.carrier_post.travelDate;
      if (typeof travelDate !== 'undefined') {
        const newDate = new Date(travelDate);
        travelDate = newDate.toJSON().slice(0, 10)
      }
        return (
          <div className="carrier-post-list-item-container">
            <Link 
              className="carrier-post-show-item"
              to={`/carriers/posts/${this.props.carrier_post._id}`}
            >
              <div className="carrier-post-list-item">
                From {this.props.carrier_post.origin} to {this.props.carrier_post.destination}
              </div>
              <div>Travel date: {travelDate}</div>
            </Link>
          </div>
        );
    }
}

export default CarrierPostListItem;