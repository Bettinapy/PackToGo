import React from "react";
import { Link } from "react-router-dom";
import './carrier_post_list.scss';

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
              <div>
                <div className="carrier-post-list-item-left">
                  <span>
                    From {this.props.carrier_post.origin} to{" "}
                  </span>
                  {this.props.carrier_post.destination}
                </div>
                <div className="carrier-post-list-item-left">
                  Travel Date: {travelDate}
                </div>
              </div>
              <div className="carrier-post-list-item-right">
                <div>
                  {this.props.carrier_post.maxWeight} lbs.
                </div>
                <div className="price">
                  ${this.props.carrier_post.fee}
                </div>
              </div>
            </Link>
          </div>
        );
    }
}

export default CarrierPostListItem;