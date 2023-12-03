import React from "react";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="homePage">
      <fieldset className="loginArea">
        <legend>Connexion</legend>
        <form action="">
          <input type="text" name="login" placeholder="✉️ Email Adress" />
          <input type="text" name="password" placeholder="🔒 Password" />
          <div className="forgotPassowrd">
            <p className="colored" onClick ={() => alert("Please Contact Irwin SOLIMAN")}>Forgot password ? </p>
          </div>

          <input type="submit" value="Login" />
        </form>
        <div className="signUp">
          <p>Not a member? </p>
          <NavLink to="/signup">
            <p className="colored"> Signup now </p>
          </NavLink>
        </div>
      </fieldset>
      <div className="inscreptionArea"></div>
    </div>
  );
};

export default HomePage;
