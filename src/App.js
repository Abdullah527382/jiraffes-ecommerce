import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";

import { setCurrentUser } from "./redux/user/user-actions";

// Import our components:
import MainPage from "../src/pages/main-page/main-page";
import SignInUp from "../src/pages/login-page/login-page";
import ItemsPage from "../src/pages/items-page/items-page";
import CartPage from "../src/pages/cart-page/cart-page";
import ContactPage from "../src/pages/contact-page/contact-page";

import NavBar from "../src/Components/navbar/navbar";
import Footer from "../src/Components/footer/footer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      u_id: null,
      cartLength: 0,
    };
  }
  unsubscribeFromAuth = null;

  handleCartLength = (cartLength) => this.setState({ cartLength });

  componentWillUnmount() {
    this.unsubscribeFromAuth = false;
  }

  render() {
    console.log(this.props.currentUser.user);
    return (
      <Router>
        <div>
          <NavBar cartLength={this.state.cartLength} />
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route
              exact
              path="/login"
              render={() =>
                this.props.currentUser.user ? (
                  <Redirect to="/login" />
                ) : (
                  <SignInUp />
                )
              }
            />

            <Route path="/cart" component={CartPage} />
            <Route
              path="/shop"
              component={ItemsPage}
              handleCartLength={this.handleCartLength}
            />
            <Route path="/contact" component={ContactPage} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user,
});

//Access the state and dispatch function from our store
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
