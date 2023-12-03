import React from "react";
import { NavLink } from "react-router-dom";

const signUpPage = () => {
  return (
    <div className="signUpPage">
      <fieldset className="loginArea">
        <legend>Sign Up</legend>
        <form action="">
          <input type="text" name="login" placeholder="✉️ Email Adress" />
          <input type="text" name="password" placeholder="🔒 Password" />
          <div className="checkboxArea">
            <input type="checkbox" />
            <p className="colored">I swear to cheat to win</p>
          </div>

          <input type="submit" value="Sign Up" />
        </form>
        <div className="signUp">
          <p>Already have an account ?</p>
          <NavLink to="/signup">
            <p className="colored"> Login here </p>
          </NavLink>
        </div>
      </fieldset>
      <div className="inscreptionArea"></div>
    </div>
  );
};

export default signUpPage;
