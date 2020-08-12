import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./navbar.scss";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div>
          <button onClick={this.logoutUser}>Log out</button>
        </div>
      );
    } else {
        switch (this.props.location.pathname) {
          case "/":
            return (
              <div>
                <Link to={"/signup"}>Sign up</Link>
                <Link to={"/login"}>Login</Link>
              </div>
            );
          default:
            break;
        }
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
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);