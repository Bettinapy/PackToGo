import React from 'react';

class MainSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role: this.props.currentUserRole,
            search: this.props.search
        }
        this.renderRole = this.renderRole.bind(this);
        this.renderIcon = this.renderIcon.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleClick(role, e) {
        // e.preventDefault()
        debugger
        return e => {
            if (role === "carrier") {
                e.target.className = "search-icon-clicked";
                e.target.previousElementSibling.className = "search-icon";
              if(!this.props.loggedIn){
                this.setState({ role: "carrier"})
              }
            } else if (role === "shipper") {
                e.target.className = "search-icon-clicked";
                e.target.nextElementSibling.className = "search-icon";
              if (!this.props.loggedIn) {
                this.setState({ role: "shipper" })
              }
            }
        }
    }

  handleFilter(type) {
    debugger
    return (e) => {
      let stateCopy = Object.assign({}, this.state);
      stateCopy.search[type] = e.target.value;
      this.setState(stateCopy)
    }
  }

  handleSearch(e) {
    debugger
    e.preventDefault();
    const serialize = obj => Object.keys(obj)
      .map(key => `${key}=${encodeURIComponent(obj[key])}`)
      .join('&')
    if (this.state.role === 'shipper') {
      this.props.history.replace({
        pathname: `/carriers/posts/search`,
        search: serialize(this.state.search)
      })
    } else {
      this.props.history.replace({
        pathname: `/shippers/posts/search`,
        search: serialize(this.state.search)
      })
    }
  }

    renderRole() {
    
      debugger
      
        if (this.state.role === 'shipper') {
            return (
              <div className="carrier-search-container">
                <label className="carrier-search-label" htmlFor="site-search">
                  Search for carriers:
                </label>
                <span>Please enter the parcel's place of origin</span>
                <input
                  className="shipper-search-input"
                  type="search"
                  id="site-search"
                  name="q"
                  aria-label="Search through site content"
                  onChange={this.handleFilter('filterOrigin')}
                  value={this.state.search.filterOrigin}
                />
                
                <span>Please enter the parcel's destination</span>
                <input
                  className="shipper-search-input"
                  type="search"
                  id="site-search"
                  name="q"
                  aria-label="Search through site content"
                  onChange={this.handleFilter('filterDestination')}
                  value={this.state.search.filterDestination}
                />
                
                <span>Please enter a desired delivery date</span>
                <input
                  className="shipper-search-input"
                  type="date"
                  min={new Date().toJSON().slice(0, 10)}
                  id="site-search"
                  name="q"
                  aria-label="Search through site content"
                  onChange={this.handleFilter('filterDate')}
                  value={this.state.search.filterDate}
                />
                <button onClick={this.handleSearch}>Search</button>
                
              </div>
            );
        }
          if (this.state.role === 'carrier'){
            return (
              <div className="shipper-search-container">
                <label className="shipper-search-label" htmlFor="site-search">
                  Search for shippers:
                </label>
                <span>Please enter your original location</span>
                <input
                  className="carrier-search-input"
                  type="search"
                  id="site-search"
                  name="q"
                  aria-label="Search through site content"
                  onChange={this.handleFilter('filterOrigin')}
                  value={this.state.search.filterOrigin}
                />

                <span>Please enter where you will be heading</span>
                <input
                  className="shipper-search-input"
                  type="search"
                  id="site-search"
                  name="q"
                  aria-label="Search through site content"
                  onChange={this.handleFilter('filterDestination')}
                  value={this.state.search.filterDestination}
                />
                <button onClick={this.handleSearch}>Search</button>

              </div>
            );
        }
            
    }

    renderIcon() {
      debugger
      if (this.props.loggedIn) {
        if (this.state.role === "shipper") {
          return (
            <div className="search-icons">
              <img
                className="search-icon"
                src="https://poblano-app-seeds.s3.amazonaws.com/icons8-package-48.png"
                alt="carrier-icon"
                onClick={this.handleClick("carrier")}
              />
            </div>
          )
        } else if (this.state.role === "carrier") {
          return (<div className="search-icons">
            <img
              id="shipper-icon"
              className="search-icon-clicked"
              src="https://poblano-app-seeds.s3.amazonaws.com/icons8-supplier-48.png"
              alt="shipper-icon"
              onClick={this.handleClick("shipper")}
            />
          </div>)
        }
      }else{
        return(
          <div className="search-icons">
          <img
            id="carrier-icon"
            className="search-icon-clicked"
            src="https://poblano-app-seeds.s3.amazonaws.com/icons8-supplier-48.png"
            alt="shipper-icon"
            onClick={this.handleClick("shipper")}
          />
          <img
            id="shipper-icon"
            className="search-icon"
            src="https://poblano-app-seeds.s3.amazonaws.com/icons8-package-48.png"
            alt="carrier-icon"
            onClick={this.handleClick("carrier")}
          />
        </div>)
      }
    }
    render() {
        
        return (
          <>
            {this.renderIcon()}
            {this.renderRole()}
          </>
        );
    };
}

export default MainSearch;