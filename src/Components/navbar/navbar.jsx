import React from "react";
import {
  HeaderContainer,
  OptionsContainer,
  OptionLink,
  ShoppingIcon,
  JiraffesIcon,
} from "./navbar-styles";

import { connect } from "react-redux";

// The navbar is always at the top of each of the pages
// The styling was done in JS as an experiment to see what was easier
const NavBar = ({ currentUser }) => (
  <HeaderContainer>
    <JiraffesIcon />
    <OptionsContainer>
      {currentUser.user ? (
        <div className="userSignedIn">
          <OptionLink to="/shop">SHOP</OptionLink>

          <OptionLink to="/" user={currentUser}>
            PROFILE
          </OptionLink>
          {!currentUser.user.admin ? (
            <OptionLink to="/contact">CONTACT</OptionLink>
          ) : (
            ""
          )}
          <OptionLink onClick={logout} to="/login">
            SIGN OUT
          </OptionLink>
          {!currentUser.user.admin ? (
            <OptionLink to="/cart">
              <ShoppingIcon className="shopping-icon" />
              <span className="item-count">{currentUser.user.cart.length}</span>
            </OptionLink>
          ) : (
            <h1>{""}</h1>
          )}
        </div>
      ) : (
        <div className="userNotSignedIn">
          <OptionLink to="/shop">SHOP</OptionLink>

          <OptionLink to="/login">SIGN IN</OptionLink>
        </div>
      )}
    </OptionsContainer>
  </HeaderContainer>
);

const logout = () => {
  window.location.replace("/login");
};

const mapStateToProps = (state) => ({
  currentUser: state.user,
});

export default connect(mapStateToProps)(NavBar);
