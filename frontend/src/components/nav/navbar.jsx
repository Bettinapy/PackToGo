import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./navbar.scss";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        dropdownClass: "hidden"
    }
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
    this.getDropDownLinks = this.getDropDownLinks.bind(this);
    this.hamburgerLinkClick();
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
    this.props.history.push("/");
    this.toggleDropdown();
  }

  // componentDidMount() {
  //   document.querySelectorAll('.hamburger-sublink').forEach(link => {
  //     debugger;
  //     return link.addEventListener('click', () => {
  //       debugger;
  //       return document.getElementById('menuDropdown').style.display = 'none';
  //     })
  //   });
  // }

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
        <div className="navbar-user-container" >
          <div className="user-greeting" onClick={() => this.props.history.push('/user')}>Hi, {this.props.currentUser.handle}</div>
          <div>{role === 'shipper' ? shipperIcon : carrierIcon}</div>
          <Link className="navbar-button" to={link}>Create a post</Link>
          <Link className="navbar-button" to={search}>Search</Link>
          <button className="navbar-button" onClick={this.logoutUser}>Log out</button>
        </div>
      );
    } else {
        // switch (this.props.location.pathname) {
        //   case "/":
            return (
              <div className="">
                <Link className="navbar-button" to={"/signup"}>Sign up</Link>
                <Link className="navbar-button" to={"/login"}>Login</Link>
              </div>
            );
    }
  }

  getDropDownLinks() {

    if (this.props.loggedIn) {
      let role = this.props.currentUser.role;
      let link = role === 'shipper' ? '/shippers/posts/create' : '/carriers/posts/create'
      let search = role === 'shipper' ? '/carriers/posts/search' : '/shippers/posts/search'
      return (
        <div>
          <div className="hamburger-sublink" onClick={() => {
            this.toggleDropdown();
            this.props.history.push('/user');}
          }>Hi, {this.props.currentUser.handle}</div>
          <div className="hamburger-sublink"><Link onClick={this.toggleDropdown} to={link} className="hamburger-sublink-text">Create a post</Link></div>
          <div className="hamburger-sublink"><Link onClick={this.toggleDropdown} to={search} className="hamburger-sublink-text">Search</Link></div>
          <button className="hamburger-sublink" onClick={this.logoutUser}>Log out</button>
        </div>
      )
    } else {
      return (
        <div className="menu-links-container">
          <Link onClick={this.toggleDropdown} className="hamburger-sublink" to={"/signup"}>Sign up</Link>
          <Link onClick={this.toggleDropdown} className="hamburger-sublink" to={"/login"}>Login</Link>
        </div>
      )
    }
  }

  toggleDropdown() {
    document.getElementById('menuDropdown').classList.toggle('show');
  }

  hamburgerLinkClick() {
    // document.querySelectorAll('.hamburger-sublink').forEach(link => {
    //   debugger;
    //   return link.addEventListener('click', () => {
    //     debugger;
    //     return document.getElementById('menuDropdown').style.display = 'none';
    //   })
    // });
    // const dropdownMenu = document.getElementById('menuDropdown');
    // dropdownMenu.addEventListener('click', () => {
    //   return dropdownMenu.style.display = 'none';
    // });
  }

  render() {
    return (
      <div className="navbar-main-container" >
        <div className="navbar-left-container">
            <Link className="logo-link" to={"/"}>
            <img className="logo-img" src="https://minicram-dev.s3.amazonaws.com/images/packtogo-logo.png" alt="logo-img"/>
            </Link>
        </div>
        <div className="navbar-right-container">
          <div className="non-hamburger-links">
            {this.getLinks()}
          </div>
            <div className = "hamburger-container">
              <div className="menu-dropdown">
                <img onClick={this.toggleDropdown} src="https://minicram-dev.s3.amazonaws.com/images/menu.png" className="hamburger-button" alt="menu"/>
                <div className="menu-dropdown-content" id="menuDropdown">
                      {this.getDropDownLinks()}
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);