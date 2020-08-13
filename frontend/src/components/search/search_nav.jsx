import React from 'react';

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
        this.props.history.replace({
            pathname: `/carriers/posts/search`,
            search: serialize(this.state)
        })
    }

    render(){
        return(
            <div className="search-form-container">
                <form onSubmit={this.handleSearch}>
                    <label htmlFor="origin">Origin
                        <input id="origin" onChange={this.handleFilter('filterOrigin')} value={this.state.filterOrigin} />
                    </label>
                    <label htmlFor="destination">Destination
                        <input id="destination" onChange={this.handleFilter('filterDestination')} value={this.state.filterDestination} />
                    </label>
                    <label htmlFor="date">Travel Date
                        <input type="date" min={new Date().toJSON().slice(0, 10)} id="date" onChange={this.handleFilter('filterDate')} value={this.state.filterDate} />
                    </label>
                    <input type="submit" value="search" />
                </form>
            </div>
        )
    }
}

export default SearchNav;