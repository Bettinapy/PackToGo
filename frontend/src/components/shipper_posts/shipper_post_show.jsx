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
              return this.props.history.push("/shippers/posts");
            });
        }
    }
    render(){
        const userAuth =
          this.props.currentUserId === this.props.shipper_post.shipperId ? (
            <>
              <button>
                <Link to={`/shippers/posts/${this.props.match.params.shipperPostId}/edit`}>
                  edit
                </Link>
              </button>
              <button onClick={ this.handleDelete }>delete</button>
            </>
          ) : (
            <></>
          );
      

        return (
          <div>
            <div>
              <h3>Origin</h3>
              <p>{this.props.shipper_post.origin}</p>
              
            </div>
            <div>
              <h3>Destination</h3>
              <p>{this.props.shipper_post.destination}</p>
              
            </div>

            <div>
              <h3>Parcel Contents</h3>
              <p>{this.props.shipper_post.parcelContents}</p>
           
            </div>

            <div>
              <h3>Max Weight</h3>
              <p>{this.props.shipper_post.maxWeight}</p>
         
            </div>
            
            <div>
                <p>Shipper</p>
                <p>{this.props.shipper_post.shipperId}</p>
            </div>
            {userAuth}
          </div>
        );
    }
}

export default ShipperPostShow;