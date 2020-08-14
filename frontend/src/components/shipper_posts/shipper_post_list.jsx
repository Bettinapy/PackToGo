import React from "react";
import ShipperPostListItem from './shipper_post_list_item';
import SearchNavContainer from '../search/search_nav_container';
import "./shipper_post_list.scss";

class ShipperPostList extends React.Component {
  componentDidMount() {
    this.props.fetchShipperPosts(this.props.search);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  componentDidUpdate(prevProps) {
    debugger
    if (prevProps.location.search !== this.props.location.search) {
      this.props.clearErrors();
      this.props.fetchShipperPosts(this.props.search);
    }
  }

  render(){

    const shipperPostList = (this.props.shipper_posts.length !==0 ? (
        this.props.shipper_posts.map(shipper_post => (
            <ShipperPostListItem key={shipper_post._id} shipper_post={shipper_post}/>
        ))
    ):(<></>))

    return(
        <>
          <SearchNavContainer />
            <div className="shipper-post-message-container">
          <div className="shipper-post-pic-message"></div>
          <span className="shipper-post-banner-heading">
            Pack someone's parcel for your journey
          </span>
        </div>
        <div className="shipper-post-container">
          <h1 className="shipper-post-heading">Results for Shippers</h1>
          <div className="shipper-post-subheading-container">
            <h2 className="shipper-post-subheading-left">
              Travel Routes 
            </h2>
          </div>
            {shipperPostList}
          </div>
        </>
    )
    
  }
}

export default ShipperPostList;