import React from "react";
import CarrierPostListItem from './carrier_post_list_item';
import './carrier_post_list.scss';

class CarrierPostList extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      filterOrigin: "",
      filterDestination: "",
      // filterDate:"",
      carrier_posts: this.props.carrier_posts
    }
    debugger
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleFilter(type){
    return(e) => {
      this.setState({[type]: e.target.value})
    }
  }

  handleSearch(e){
    e.preventDefault();
    let carrier_posts = this.state.carrier_posts
    if(this.state.filterOrigin){
      carrier_posts = carrier_posts.filter(
        item => item.origin.toLowerCase().includes(this.state.filterOrigin))
    }

    if (this.state.filterDestination) {
      carrier_posts = carrier_posts.filter(
        item => item.destination.toLowerCase().includes(this.state.filterDestination))
    }
    this.setState({carrier_posts})
  }
  
  

  componentDidMount() {
    debugger
    this.props.fetchCarrierPosts();
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }


  render(){
    
    //let carrier_posts = this.state.carrier_posts

    // if(this.state.filterOrigin){
    //   carrier_posts = carrier_posts.filter(
    //     item => item.origin.toLowerCase().includes(this.state.filterOrigin))
    // }

    // if (this.state.filterDestination) {
    //   carrier_posts = carrier_posts.filter(
    //     item => item.destination.toLowerCase().includes(this.state.filterDestination))
    // }

    // if (this.state.filterDate) {
    //   carrier_posts = carrier_posts.filter(
    //     item => item.travelDate.toLowerCase().includes(this.state.filterDate))
    // }

    const carrierPostList = (this.state.carrier_posts.length !==0 ? (
        this.state.carrier_posts.map(carrier_post => (
            <CarrierPostListItem key={carrier_post._id} carrier_post={carrier_post}/>
        ))
    ):(<></>))    
    debugger
    return(
        <>
          <div className="search-form-container">
            <form onSubmit={this.handleSearch}>
              <label htmlFor="origin">Origin
                <input id="origin" onChange={this.handleFilter('filterOrigin')} value={this.state.filterOrigin} />
              </label>
              <label htmlFor="destination">Destination
                <input id="destination" onChange={this.handleFilter('filterDestination')} value={this.state.filterDestination} />
              </label>
              {/* <label htmlFor="date">Travel Date
                  <input type="date" min={new Date().toJSON().slice(0, 10)} id="date" onChange={this.handleFilter('filterDate')} value={this.state.filterDate} />
              </label> */}
              <input type="submit" value="search"/>
            </form>
          </div>

          <h1>Carrier Posts</h1>
          {carrierPostList}
        </>
    )
    
  }
}

export default CarrierPostList;