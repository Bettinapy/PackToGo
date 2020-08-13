import React from "react";
import { withRouter, Link } from "react-router-dom";
import './session.scss';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      handle: "",
      password: "",
      role: "shipper",
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.signedIn === true) {
    //   this.props.history.push("/");
    // }

    this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return (e) => {
      if (field !== "role") {
        if (e.currentTarget.value.length > 0) {
          e.currentTarget.previousSibling.className = `${field}-label-filled`
        } else {
          e.currentTarget.previousSibling.className = `${field}-label`
        }
      }
      this.setState({ [field]: e.currentTarget.value });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      handle: this.state.handle,
      password: this.state.password,
      role: this.state.role,
    };

    this.props.signUp(user).then((action) => {
      debugger
      if(action.currentUser){

        if (action.currentUser.role === "shipper") {
          debugger;
          this.props.history.push("/carriers/posts");
        } else if (action.currentUser.role === "carrier") {
          this.props.history.push("/shippers/posts");
        }
      }
    });
  }

  _onBlur(updateBlur, field) {
    return (e) => {
      e.target.className = `input-${field}-blurred`;
      this.state.updateBlur
        ? this.setState({ [updateBlur]: false })
        : this.setState({ [updateBlur]: true });
    };
  }

  _onFocus(updateFocus, field) {
    return (e) => {
      e.target.className = `input-${field}-focused`;
      this.state.updateFocus
        ? this.setState({ [updateFocus]: false })
        : this.setState({ [updateFocus]: true });
    };
  }

  renderErrors(field) {
    const errorsMessages = {};
    Object.keys(this.state.errors).map((error, i) => {
      return errorsMessages[error] = <span className="error-message" key={`error-${i}`}>{this.state.errors[error]}</span>
    });
    return (
      errorsMessages[field]
    );
  }

  render() {
    const otherForm = () => {
      return (
        <div className="other-form-container">
          <h3 className="heading-other-form">Already a member?</h3>
          <span className="subheading-other-form">Welcome back!</span>
          <br />
          <Link className="other-button" to="/login">Login</Link>
        </div>
      )
    }
    return (
      <div className="signup-main-container">
        <div className="signup-left-container">
          <div className="form-wrapper">
            <form className="signup-form" onSubmit={this.handleSubmit}>
              <h2>Sign Up</h2>
              <div className="input-container">
                <div className="email-label">Email</div>
                <input
                  className="input"
                  type="text"
                  value={this.state.email}
                  onChange={this.update("email")}
                  placeholder="Email"
                  onBlur={this._onBlur("updateBlur", "email")}
                  onFocus={this._onFocus("updateFocus", "email")}
                />
                <br />
                <div className="error-message-container">
                  {this.renderErrors("email")}
                </div>
                <div className="handle-label">Username</div>
                <input
                  className="input"
                  type="text"
                  value={this.state.handle}
                  onChange={this.update("handle")}
                  placeholder="Username"
                  onBlur={this._onBlur("updateBlur", "handle")}
                  onFocus={this._onFocus("updateFocus", "handle")}
                />
                <br />
                <div className="error-message-container">
                  {this.renderErrors("handle")}
                </div>
                <div className="password-label">Password</div>
                <input
                  className="input"
                  type="password"
                  value={this.state.password}
                  onChange={this.update("password")}
                  placeholder="Password"
                  onBlur={this._onBlur("updateBlur", "password")}
                  onFocus={this._onFocus("updateFocus", "password")}
                />
                <br />
                <div className="error-message-container">
                  {this.renderErrors("password")}
                </div>
                <div className="role-container">Role Preference</div>
                <div className="radio-buttons">
                  <label className="radio-button-labels">
                    <input
                      className="radio-button"
                      type="radio"
                      defaultChecked
                      value="shipper"
                      name="role"
                      onClick={this.update("role")}
                    />
                    Shipper
                  </label>
                  <label className="radio-button-labels">
                    <input
                      className="radio-button"
                      type="radio"
                      value="carrier"
                      name="role"
                      onClick={this.update("role")}
                    />
                    Carrier
                  </label>
                </div>
                <input type="submit" value="Submit" />
                {this.renderErrors()}
                {otherForm()}
              </div>
            </form>
          </div>
        </div>
        <div className="signup-right-container">
          <div className="signup-side-pic-container"></div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);