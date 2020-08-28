import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./navbar.scss";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
    this.props.history.push("/");
  }

  getLinks() {
    const shipperIcon = (<img
      className="search-icon"
      src="https://poblano-app-seeds.s3.amazonaws.com/navbarshipper.png"
      alt="shipper-icon"/>)

    const carrierIcon = (<img
      className="search-icon-clicked"
      src="https://poblano-app-seeds.s3.amazonaws.com/navbarcarrier.png"
      alt="carrier-icon"/>)

    if (this.props.loggedIn) {
      let role = this.props.currentUser.role;
      let link = role === 'shipper' ? '/shippers/posts/create' : '/carriers/posts/create'
      let search = role === 'shipper' ? '/carriers/posts/search' : '/shippers/posts/search'
      return (
        <div className="navbar-user-container">
          <div className="user-greeting" onClick={() => this.props.history.push(`/user`)}>Hi, {this.props.currentUser.handle}</div>
          <div>{role === 'shipper' ? shipperIcon : carrierIcon}</div>
          <Link className="navbar-button" to={link}>
            Create a post
          </Link>
          <Link className="navbar-button" to={search}>Search</Link>
          <button className="navbar-button" onClick={this.logoutUser}>
            Log out
          </button>
        </div>
      );
    } else {
        // switch (this.props.location.pathname) {
        //   case "/":
            return (
              <div>
                <Link className="navbar-button" to={"/signup"}>Sign up</Link>
                <Link className="navbar-button" to={"/login"}>Login</Link>
              </div>
            );
    }
  }

  render() {
    return (
      <div className="navbar-main-container">
        <div className="navbar-left-container">
            <Link className="logo-link" to={"/"}>
            <img className="logo-img" src="https://minicram-dev.s3.amazonaws.com/images/packtogo-logo.png" alt="logo-img"/>
            </Link>
        </div>
        <div className="navbar-right-container">
            {this.getLinks()}
            <div className = "hamburger-container">
              <button className="hamburger-button"><img src="https://minicram-dev.s3.amazonaws.com/images/menu.png" alt=""/></button>
            </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);