import React from "react";
import ShipperPostListItem from './shipper_post_list_item';
import SearchNavContainer from '../search/search_nav_container';

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
            <h1>Shipper Posts</h1>
            {shipperPostList}
        </>
    )
    
  }
}

export default ShipperPostList;