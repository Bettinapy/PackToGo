import React from "react";
import { Link } from "react-router-dom";

class CarrierPostShow extends React.Component{
    constructor(props){
        super(props);
        this.state = this.props.carrier_post;
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount(){
        this.props.fetchCarrierPost(this.props.match.params.carrierPostId);
    }

    componentWillMount(){
        this.props.clearErrors();
    }

    handleDelete(e){
        e.preventDefault();
        const choice = confirm("Delete this post?");
        if (choice === true) {
          this.props
            .deleteCarrierPost(this.props.match.params.carrierPostId)
            .then(() => {
              return this.props.history.push("/");
            });
        }
    }
    render(){
        const userAuth =
          this.props.currentUserId === this.props.carrier_post.carrier_id ? (
            <>
              <button>
                <Link to={`/carriers/${this.props.match.params.carrierPostId}/edit`}>
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
              <p>{this.props.carrier_post.origin}</p>
            </div>
            <div>
              <h3>Destination</h3>
              <p>{this.props.carrier_post.destination}</p>
            </div>
            <div>
              <h3>Travel Date</h3>
              <p>{this.props.carrier_post.travel_date}</p>
            </div>
            <div>
              <h3>fee</h3>
              <p>{this.props.carrier_post.fee}</p>
            </div>
            <div>
              <h3>Parcel Contents</h3>
              <p>{this.props.carrier_post.parcel_contents}</p>
            </div>
            <div>
              <h3>Max Weight</h3>
              <p>{this.props.carrier_post.max_weight}</p>
            </div>
            <div>
              <h3>transportation</h3>
              <p>{this.props.carrier_post.transportation}</p>
            </div>
            <div>
                <p>Carrier</p>
                <p>{this.props.carrier_post.carrier_id}</p>
            </div>
            {userAuth}
          </div>
        );
    }
}

export default CarrierPostShow;