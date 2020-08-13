import React from "react";
import CarrierPostListItem from './carrier_post_list_item';
import './carrier_post_list.scss';
import SearchNavContainer from '../search/search_nav_container';

class CarrierPostList extends React.Component {

  componentDidMount() {
    debugger
    this.props.fetchCarrierPosts(this.props.search);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  componentDidUpdate(prevProps){
    debugger
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
    debugger
    return(
        <>
          <SearchNavContainer />
          <h1 className="carrier-post-heading">Results for Carriers</h1>
          {carrierPostList}
        </>
    )
    
  }
}

export default CarrierPostList;