import React from "react";
import { Link } from "react-router-dom";

class ShipperPostListItem extends React.Component{
    render(){
        return (
          <div className="shipper-post-list-item-container">
            <Link
              className="shipper-post-show-item"
              to={`/shippers/posts/${this.props.shipper_post._id}`}
            >
              <div>
                <div className="shipper-post-list-item-left">
                  From {this.props.shipper_post.origin} to {this.props.shipper_post.destination}
                </div>
              </div>
            </Link>
          </div>
        );
    }
}

export default ShipperPostListItem;