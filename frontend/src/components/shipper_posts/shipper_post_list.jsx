import React from "react";

import ShipperPostListItem from './shipper_post_list_item';

class ShipperPostList extends React.Component {
  componentDidMount() {
    this.props.fetchShipperPosts();
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  render(){

    const shipperPostList = (this.props.shipper_posts.length !==0 ? (
        this.props.shipper_posts.map(shipper_post => (
            <ShipperPostListItem key={shipper_post._id} shipper_post={shipper_post}/>
        ))
    ):(<></>))

    return(
        <>
            <h1>All Shipper Posts</h1>
            {shipperPostList}
        </>
    )
    
  }
}

export default ShipperPostList;