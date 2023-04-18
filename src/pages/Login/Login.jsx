import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  useNavigate,
  Link,
  // useLocation
} from "react-router-dom";

//import style.css
import "../Login/style.css";

export default function Login({ handleToken }) {
  //variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //pour naviguer vers la page Home--
  const navigate = useNavigate();

  //décalaration de fonction pour requete vers Backend
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        email: email,
        password: password,
      });
      console.log(response.data);

      //si le token existe (donc si le user est déjà en BDD)
      if (response.data.token) {
        handleToken(response.data.token);
        console.log(response.data.token);

        alert("Vous êtes maintenant connecté");
        navigate("/");
      }
    } catch (error) {
      //si email n'est pas en BDD
      if (error.response.data.message === "Unknown email") {
        setErrorMessage("Aucun compte ne correspond à cet email");
      }
      //si mot de passe inconnu
      if (error.response.data.message === "Wrong password") {
        setErrorMessage("Mot de passe non valide");
      }
    }
  };

  return (
    <div className="signupContainer">
      <div className="signupForm">
        <div className="1">
          <h1>Log in</h1>
        </div>

        <form
          className="formSign1"
          onSubmit={(event) => {
            event.preventDefault();
            handleLogin();
          }}
        >
          <input
            id="email"
            value={email}
            type="text"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            id="password"
            value={password}
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="2" type="submit">
            Login
          </button>

          <Link to={"/user/signup"}>
            <p>No account, please sign up</p>
          </Link>
          {/* génération du message d'erreur */}
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}
