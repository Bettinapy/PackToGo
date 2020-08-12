import React from "react";
import { Link } from "react-router-dom";

class ShipperPostListItem extends React.Component{
    render(){
        return (
          <div>
            <Link to={`/shippers/posts/${this.props.shipper_post._id}`}>
              <div>
                From {this.props.shipper_post.origin} to {this.props.shipper_post.destination}
              </div>
              <div>Travel date: {this.props.shipper_post.travel_date}</div>
            </Link>
          </div>
        );
    }
}

export default ShipperPostListItem;