import React from 'react';

class MainSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role: "shipper"
        }
        this.renderRole = this.renderRole.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(role, e) {
        // e.preventDefault()
        return e => {
            if (this.state.role === "shipper" && role === "carrier") {
                this.setState( { role: "carrier"} );
                e.target.className = "search-icon-clicked";
                e.target.previousElementSibling.className = "search-icon";
            } else if (this.state.role === "carrier" && role === "shipper") {
                e.target.className = "search-icon-clicked";
                e.target.nextElementSibling.className = "search-icon";
                this.setState({ role: "shipper" });;
            }
        }
    }

    renderRole() {
        if (this.state.role === "shipper") {
            return (
              <div className="carrier-search-container">
                <label className="carrier-search-label" for="site-search">
                  Search for carriers:
                </label>
                <span>Please enter the parcel's place of origin</span>
                <input
                  className="shipper-search-input"
                  type="search"
                  id="site-search"
                  name="q"
                  aria-label="Search through site content"
                />
                
                <span>Please enter the parcel's destination</span>
                <input
                  className="shipper-search-input"
                  type="search"
                  id="site-search"
                  name="q"
                  aria-label="Search through site content"
                />
                
                <span>Please enter a desired delivery date</span>
                <input
                  className="shipper-search-input"
                  type="date"
                  id="site-search"
                  name="q"
                  aria-label="Search through site content"
                />
                <button>Search</button>
                
              </div>
            );
        } else {
            return (
              <div className="shipper-search-container">
                <label className="shipper-search-label" for="site-search">
                  Search for shippers:
                </label>
                <span>Please enter your original location</span>
                <input
                  className="carrier-search-input"
                  type="search"
                  id="site-search"
                  name="q"
                  aria-label="Search through site content"
                />
                
                <span>Please enter where you will be heading</span>
                <input
                  className="shipper-search-input"
                  type="search"
                  id="site-search"
                  name="q"
                  aria-label="Search through site content"
                />
                <button>Search</button>
                
              </div>
            );
        }

    }

    render() {

        return (
          <>
            <div className="search-icons">
              <img
                className="search-icon-clicked"
                src="https://poblano-app-seeds.s3.amazonaws.com/icons8-supplier-48.png"
                alt="shipper-icon"
                onClick={this.handleClick("shipper")}
              />
              <img
                className="search-icon"
                src="https://poblano-app-seeds.s3.amazonaws.com/icons8-package-48.png"
                alt="carrier-icon"
                onClick={this.handleClick("carrier")}
              />
            </div>
            {this.renderRole()}
          </>
        );
    };
}

export default MainSearch;