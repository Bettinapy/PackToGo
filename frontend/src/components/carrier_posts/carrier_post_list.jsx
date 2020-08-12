import React from "react";

import CarrierPostListItem from './carrier_post_list_item';

class CarrierPostList extends React.Component {
  componentDidMount() {
    this.props.fetchCarrierPosts();
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  render(){

    const carrierPostList = (this.props.carrier_posts.length !==0 ? (
        this.props.carrier_posts.map(carrier_post => (
            <CarrierPostListItem key={carrier_post._id} carrier_post={carrier_post}/>
        ))
    ):(<></>))

    return(
        <>
            <h1>All Carrier Posts</h1>
            {carrierPostList}
        </>
    )
    
  }
}

export default CarrierPostList;