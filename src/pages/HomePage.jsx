import { useRef, useState } from "react";
import { NavLink, useLoaderData } from "react-router-dom";

const HomePage = () => {
  const dbUsers = useLoaderData(); // on récupère la dataBaseUsers via le loaderData
  console.log(dbUsers);
  const inputEmail = useRef(null); // permettra de récupérer les valeurs saisies dans le form
  const inputPassword = useRef(null);

  const [authentifcation, setauthentifcation] = useState("");
  const [checkEmail, setCheckEmail] = useState(true);
  const [checkPassword, setCheckPassword] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault(); //permet d'éviter de rafraichir la page au click de submit
    const emailSubmited = inputEmail.current.value;
    const passwordSubmited = inputPassword.current.value;
    console.log("emailSubmited", emailSubmited);
    console.log("emailTable", dbUsers[0].email);

    dbUsers.forEach((user) => {
      setCheckEmail(true);
      setCheckPassword(true);

      if (user.email === emailSubmited && user.password === passwordSubmited) {
        setauthentifcation(user.psedo);
      } else {
        if (user.email != emailSubmited && user.password != passwordSubmited) {
          setCheckEmail(false);
          setCheckPassword(false);
        }

        if (user.email != emailSubmited) {
          setCheckEmail(false);
          setCheckPassword(false);
        }
        if (user.password != passwordSubmited) {
          setCheckPassword(false);
        }
      }
    });
  };

  return (
    <div className="homePage">
      {authentifcation != "" ? (
        <div className="authentifcationSucess">
          <div className="message">
            {" "}
            <p>🎆Welcome {authentifcation} 🎇</p>{" "}
          </div>
          <NavLink to="/game1">
            <button className="btnsucess">Enter</button>
          </NavLink>
        </div>
      ) : (
        <>
          <fieldset className="loginArea">
            <legend>Connexion</legend>
            <form action="" onSubmit={handleSubmit}>
              <div className="email">
                <input
                  type="text"
                  name="login"
                  ref={inputEmail}
                  placeholder="✉️ Email Adress"
                />
                {!checkEmail && <div>❌</div>}
              </div>
              <div className="password">
                <input
                  type="text"
                  name="password"
                  ref={inputPassword}
                  placeholder="🔒 Password"
                />
                {!checkPassword && <div>❌</div>}
              </div>
              <div className="forgotPassowrd">
                <p
                  className="colored"
                  onClick={() => alert("Please Contact Irwin SOLIMAN")}
                >
                  Forgot password ?{" "}
                </p>
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
        </>
      )}
    </div>
  );
};

export default HomePage;
