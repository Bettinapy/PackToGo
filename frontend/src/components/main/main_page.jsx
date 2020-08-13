import React from 'react'
import './main.scss';
import { Link } from 'react-router-dom';
import MainSearchContainer from './main_search_container';

//change Link to route to shippers show page instead
export default function MainPage() {
    return (
      <div className="main-container">
        <div className="main-banner-container">
          <div className="banner-photo"></div>
          {/* <img
            className="banner-pic"
            src="https://minicram-dev.s3.amazonaws.com/images/travel-pic.png'"
            alt=""
          /> */}
          <span className="banner-heading">
            Traveling and got some extra space?
          </span>
          <span className="banner-subheading">
            See who's nearby and needs an item delivered to your destination.
          </span>
          <span className="banner-subheading-two">
            Get paid when you arrive.
          </span>
          <Link className="banner-button" to="/signup">
            See Posts
          </Link>
        </div>
        <div className="main-post-container">
          <div className="main-post-search-header">
            Search for a carrier or a shipper
          </div>
          <div className="main-post-search-container">
            <div className="post-search-container">
              <div className="post-search-inner-container">
                <MainSearchContainer />
              </div>
            </div>
          </div>
          <img
            className="post-background-pic"
            src="https://poblano-app-seeds.s3.amazonaws.com/main-post-pic.jpg"
            alt="post-background-pic"
          />
        </div>
      </div>
    );
};

