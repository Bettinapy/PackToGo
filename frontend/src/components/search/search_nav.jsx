import React from 'react';
import './search.scss';

class SearchNav extends React.Component{
    constructor(props) {

        super(props);
        this.state = this.props.search
    
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleFilter(type) {
        return (e) => {
            this.setState({ [type]: e.target.value })
        }
    }

  handleSearchBox(e){
    e.preventDefault();
    document.getElementById("search-bar").classList.add("show-search")
  }

    handleSearch(e) {
    
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
            <>
            <label
                className="search-form-label"
                htmlFor="date">Date After
                <input
                    className="search-form-input"
                    type="date" 
                    min={new Date().toJSON().slice(0, 10)} 
                    id="date" 
                    onChange={this.handleFilter('filterDate')} 
                    value={this.state.filterDate} 
                />
            </label>
            <label
              className="search-form-label"
              htmlFor="date">Date Before
                <input
                className="search-form-input"
                type="date"
                min={this.state.filterDate}
                id="date"
                onChange={this.handleFilter('dateBefore')}
                value={this.state.dateBefore}
              />
            </label>
            </>
        ):(<></>))
        return (
          <>
          <div className="search-box-container" >
              <div className="search-box-box" id="search-box">
                <div className="search-box">
                  <input type="text" 
                        onClick={this.handleSearchBox.bind(this)} 
                        className="search-placeholder" 
                        placeholder="Start your search"/>
                
                <div className="search-icon">
                    <i className="fa fa-search input-search-icon" aria-hidden="true"></i>    
                </div>
              </div>
            </div>
          </div>
          <div className="search-form-container" id="search-bar">
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
          </>
        );
    }
}

export default SearchNav;