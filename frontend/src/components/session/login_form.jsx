import React from "react";
import { withRouter, Link } from "react-router-dom";
import './session.scss';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.currentUser === true) {
    // }
    this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return (e) => {
      if (e.currentTarget.value.length > 0) {
        e.currentTarget.previousSibling.className=`${field}-label-filled`
      } else {
        e.currentTarget.previousSibling.className = `${field}-label`
      }
      this.setState({[field]: e.currentTarget.value});
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    
    const user = {
        email: this.state.email,
        password: this.state.password,
    };

    this.props.login(user).then(action => {
      if (action.currentUser){
        // this.props.history.push(`/user`);
        // if (action.currentUser.role === "shipper") {
        //   this.props.history.push(`/user`);
        // } else {
        //   this.props.history.push(`/user`);
        // }
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
          <h3 className="heading-other-form">Not a member?</h3>
          <span className="subheading-other-form">Start shipping or delivering.</span>
          <br />
          <Link className="other-button" to="/signup">Sign up</Link>
        </div>
      )
    }

    return (
      <div className="login-main-container">
        <div className="login-left-container">
          <div className="form-wrapper">
            <form className="login-form" onSubmit={this.handleSubmit}>
              <h2>Login</h2>
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
                <input type="submit" value="Submit" />
              </div>
              {otherForm()}
            </form>
          </div>
        </div>
        <div className="login-right-container">
          <div className="login-side-pic-container"></div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);