import React from "react";
import { Link } from "react-router-dom";

class ShipperPostShow extends React.Component{
    constructor(props){
        super(props);
        this.state = this.props.shipper_post;
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount(){
        this.props.fetchShipperPost(this.props.match.params.shipperPostId);
    }

    componentWillMount(){
        this.props.clearErrors();
    }

    handleDelete(e){
        e.preventDefault();
        const choice = window.confirm("Delete this post?");
        if (choice === true) {
          this.props
            .deleteShipperPost(this.props.match.params.shipperPostId)
            .then(() => {
              return this.props.history.push("/");
            });
        }
    }
    render(){
        const userAuth =
          this.props.currentUserId === this.props.shipper_post.shipperId ? (
            <>
              <div className="user-button-container">
                <Link
                  className="user-button"
                  to={`/shippers/posts/${this.props.match.params.shipperPostId}/edit`}
                >
                  edit
                </Link>

                <button className="user-button" onClick={this.handleDelete}>
                  delete
                </button>
              </div>
            </>
          ) : (
            <></>
          );
      

        return (
          <div className="carrier-post-show-container">
            <div className="carrier-post-header">
              From {this.props.shipper_post.origin} to{" "}
              {this.props.shipper_post.destination}
            </div>
            <div className="carrier-show-container">
              <div className="carrier-show-col-containter">
                <h3>Origin</h3>
                <p>{this.props.shipper_post.origin}</p>
              </div>
              <div className="carrier-show-col-containter">
                <h3>Destination</h3>
                <p>{this.props.shipper_post.destination}</p>
              </div>

              <div className="carrier-show-col-containter">
                <h3>Parcel Contents</h3>
                <p>{this.props.shipper_post.parcelContents}</p>
              </div>

              <div className="carrier-show-col-containter">
                <h3>Max Weight</h3>
                <p>{this.props.shipper_post.maxWeight} lbs</p>
              </div>

              {/* <div className="carrier-show-col-containter">
                <p>Shipper</p>
                <p>{this.props.shipper_post.shipperId}</p>
              </div> */}
              {userAuth}
            </div>
          </div>
        );
    }
}

export default ShipperPostShow;