import React from 'react';
import './search.scss';

class SearchNav extends React.Component{
    constructor(props) {

        super(props);
        this.state = this.props.search
        debugger
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleFilter(type) {
        return (e) => {
            this.setState({ [type]: e.target.value })
        }
    }

    handleSearch(e) {
        debugger
        e.preventDefault();
        const serialize = obj => Object.keys(obj)
            .map(key => `${key}=${encodeURIComponent(obj[key])}`)
            .join('&')
        if (this.props.history.location.pathname.includes('carriers')){
            this.props.history.replace({
                pathname: `/carriers/posts/search`,
                search: serialize(this.state)
            })
        } else {
            this.props.history.replace({
                pathname: `/shippers/posts/search`,
                search: serialize(this.state)
            })
        }
    }

    render(){
        const travelDate = (this.props.history.location.pathname.includes('carriers') ? (
            <label
                className="search-form-label"
                htmlFor="date">Travel Date
                <input
                    className="search-form-input"
                    type="date" 
                    min={new Date().toJSON().slice(0, 10)} 
                    id="date" 
                    onChange={this.handleFilter('filterDate')} 
                    value={this.state.filterDate} 
                />
            </label>
        ):(<></>))
        return (
          <div className="search-form-container">
            <div className="form-wrapper">
              <form className="search-form" onSubmit={this.handleSearch}>
                <div>
                  <label 
                    className="search-form-label" 
                    htmlFor="origin">
                    Origin
                    <input
                      className="search-form-input"
                      id="origin"
                      onChange={this.handleFilter("filterOrigin")}
                      value={this.state.filterOrigin}
                    />
                  </label>
                </div>
                <div>
                  <label 
                    className="search-form-label"
                    htmlFor="destination">
                    Destination
                    <input
                      id="destination"
                      onChange={this.handleFilter("filterDestination")}
                      value={this.state.filterDestination}
                    />
                  </label>
                </div>
                <div>
                    {travelDate}
                </div>
                <input
                  className="carrier-list-search-button"
                  type="submit"
                  value="search"
                />
              </form>
            </div>
          </div>
        );
    }
}

export default SearchNav;