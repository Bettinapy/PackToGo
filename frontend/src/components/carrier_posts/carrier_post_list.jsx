import React from "react";
import CarrierPostListItem from './carrier_post_list_item';
import './carrier_post_list.scss';
import SearchNavContainer from '../search/search_nav_container';

class CarrierPostList extends React.Component {

  componentDidMount() {

    this.props.fetchCarrierPosts(this.props.search);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  componentDidUpdate(prevProps){

    if(prevProps.location.search !== this.props.location.search){
      this.props.clearErrors();
      this.props.fetchCarrierPosts(this.props.search);
    }
  }

  render(){

    const carrierPostList = (this.props.carrier_posts.length !==0 ? (
        this.props.carrier_posts.map(carrier_post => (
            <CarrierPostListItem key={carrier_post._id} carrier_post={carrier_post}/>
        ))
    ):(<></>))    

    return (
      <>
        <SearchNavContainer />
        <div className="carrier-post-message-container">
          <div className="carrier-post-pic-message"></div>
          <span className="carrier-post-banner-heading">
            Find a traveler for your parcel.
          </span>
        </div>
        <div>
          <div className="carrier-list-container">
            <h1 className="carrier-post-heading">Results for Carriers</h1>
            <div className="carrier-post-subheading-container">
              <h2 className="carrier-post-subheading-left">
                Travel Routes and Dates
              </h2>
              
              <div className="carrier-post-subheading-mid">
                <h2>Max Carriable Weight</h2>
              </div>
              <div className="carrier-post-subheading-right">
                <h2>Price</h2>
              </div>
              
            </div>
            {carrierPostList}
          </div>
        </div>
      </>
    );
    
  }
}

export default CarrierPostList;