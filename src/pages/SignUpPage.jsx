import { useRef } from "react";
import { NavLink, useRevalidator, useNavigate } from "react-router-dom";

import axios from "axios";

const SignUpPage = () => {
  const revalidator = useRevalidator; //permet de stocker le hook qui va rafraichir le loader (pour fetch à nouveau la database après le POST par exemple)
  const navigate = useNavigate(); // permet de rediriger vers une page (après la fin d'une function handleclick par ex)

  const inputEmail = useRef(null); // permettra de récupérer les valeurs saisies dans le form
  const inputPassword = useRef(null);
  const inputPsedo = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); //permet d'éviter de rafraichir la page au click de submit
    const email = inputEmail.current.value; // permet de récupérer les valeurs saisies dans le form
    const password = inputPassword.current.value;
    const psedo = inputPsedo.current.value;

    try {
      const res = await axios.post("http://localhost:5000/api/users", {
        // on INSERT dans la DB avec les infos saisies
        email,
        password,
        psedo,
      });
      revalidator.revalidate(); //on recharge les données de la DB
    } catch (e) {
      console.log(e);
    }
    navigate("/"); //on redirige vers la page de connexion après la saisie du compte
  };

  return (
    <div className="signUpPage">
      <fieldset className="loginArea">
        <legend>Sign Up</legend>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            name="login"
            ref={inputEmail} // permet de récupérer la saisie en tant que "inputEmail"
            placeholder="✉️ Email Adress"
          />
          <input
            type="text"
            name="psedo"
            ref={inputPsedo}
            placeholder="🥷 Psedo"
          />
          <input
            type="text"
            name="password"
            ref={inputPassword}
            placeholder="🔒 Password"
          />
          <div className="checkboxArea">
            <input type="checkbox" />
            <p className="colored">I am older than 3 y.o</p>
          </div>

          <input type="submit" value="Sign Up" />
        </form>
        <div className="signUp">
          <p>Already have an account ?</p>
          <NavLink to="/">
            <p className="colored"> Login here </p>
          </NavLink>
        </div>
      </fieldset>
      <div className="inscreptionArea"></div>
    </div>
  );
};

export default SignUpPage;
