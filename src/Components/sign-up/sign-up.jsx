import React from "react";
import GlobalError from "../dismiss-error/GlobalError";
import { withRouter } from "react-router-dom";
import { setCurrentUser } from "../../redux/user/user-actions";
import { connect } from "react-redux";
import "./sign-up-styles.css";

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      u_id: null,
      isAdmin: false,
      error: null,
    };
    this._resetError = this._resetError.bind(this);
    this._setError = this._setError.bind(this);
  }

  onSubmitClick = async (e) => {
    e.preventDefault();

    fetch("/api/signup", {
      method: "post",
      body: JSON.stringify({
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.error) {
          this.setState({ error: user.error });
        } else {
          this.setState({ isAdmin: user.admin, u_id: user.key });
          // Redirect to main page after login
          this.props.dispatch(setCurrentUser(user));

          this.props.history.push({
            pathname: "/",
            search: "?uid=" + user.key + "admin=" + user.admin,
            state: {
              userId: user.key,
              isAdmin: user.admin,
              firstName: user.first_name,
              lastName: user.last_name,
              userCart: user.cart,
            },
          });
        }
      });
  };

  render() {
    return (
      <div className="signup">
        <div className="container">
          <GlobalError error={this.state.error} resetError={this._resetError} />
        </div>
        <h2>Sign Up</h2>
        <form action="/">
          <div>
            <h4>First Name</h4>
            <input
              type="text"
              placeholder="First Name"
              value={this.state.first_name}
              onChange={(e) => this.setState({ first_name: e.target.value })}
              required
            />
            <h4>Last Name</h4>
            <input
              type="text"
              placeholder="Last Name"
              value={this.state.last_name}
              onChange={(e) => this.setState({ last_name: e.target.value })}
              required
            />
            <h4>Email</h4>
            <input
              type="email"
              placeholder="email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
              required
            />
          </div>
          <div>
            <h4>Password</h4>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => this.setState({ password: e.target.value })}
              value={this.state.password}
              required
            />
          </div>
          <button
            onClick={this.onSubmitClick}
            type="submit"
            style={{
              color: "black",
              fontWeight: "bold",
              padding: "14px 20px",
              margin: "8px 350px",
              border: "none",
              cursor: "pointer",
              width: "30%",
              marginTop: "40px",
            }}
          >
            Sign Up
          </button>
        </form>
      </div>
    );
  }

  _resetError() {
    this.setState({ error: "" });
  }

  _setError(newError) {
    this.setState({ error: newError });
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

export default connect(mapStateToProps)(withRouter(SignUp));
