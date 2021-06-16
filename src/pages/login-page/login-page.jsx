import React from "react";

import Login from "../../Components/sign-in/sign-in";
import Signup from "../../Components/sign-up/sign-up";

import "./login-page-styles.css";

const SignInUp = () => (
  <div className="sign-in-and-sign-up">
    <Login />
    <Signup />
  </div>
);

export default SignInUp;
