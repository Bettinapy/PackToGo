import React from "react";
import { Link, withRouter } from "react-router-dom";
// import "./navbar.css";

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
        if (this.props.location.pathname === "/login") {
            return (
              <div>
                <Link to={"/signup"}>Sign up</Link>
              </div>
            );
        } else {
            return (
            <div>
                <Link to={"/login"}>Login</Link>
            </div>
            );
        }
    }
  }

  render() {
    return (
      <div>
        <Link to={"/"}>Pack-To-Go</Link>
        {this.getLinks()}
      </div>
    );
  }
}

export default withRouter(NavBar);