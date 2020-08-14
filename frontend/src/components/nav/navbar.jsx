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
    this.props.history.push("/");
  }

  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className="navbar-user-container">
          <p className="user-greeting" >Hi, {this.props.currentUser.handle}</p>
          <button className="navbar-button" onClick={this.logoutUser}>Log out</button>
        </div>
      );
    } else {
        switch (this.props.location.pathname) {
          case "/":
            return (
              <>
                <Link className="navbar-button" to={"/signup"}>Sign up</Link>
                <Link className="navbar-button" to={"/login"}>Login</Link>
              </>
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