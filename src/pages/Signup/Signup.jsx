import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  useNavigate,
  Link,
  // useLocation
} from "react-router-dom";

//import style.css
import "../Signup/style.css";

//import icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Signup({ handleToken }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // formdata pour cloudinary---------------------------------------------
  const [picture, setPicture] = useState();
  //--------------------------------------------------------------------------

  const handleSignup = async () => {
    setErrorMessage("");
    try {
      //formdata pour cloudinary---------------------------------------------

      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("passwordConf", passwordConf);
      formData.append("picture", picture);

      //------------------------------------------------------------------
      //vers locahost3000
      const response = await axios.post(
        "https://site--tmdb-back--zqfvjrr4byql.code.run/user/signup",
        formData
      );
      if (response.data.token) {
        handleToken(response.data.token);
        alert("Votre compte a été créé");
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data, "erreur signup");
      if (error.response.data.message === "This email is already used") {
        setErrorMessage(
          "Cet email est déjà utilisé, veuillez créer un compte avec un email valide"
        );
      }
      if (error.response.data.message === "This username is already used") {
        setErrorMessage(
          "Ce nom d'utilisateur est déjà utilisé, veuillez créer un compte avec un nom d'utilisateur valide"
        );
      }
      if (error.response.data.message === "Missing parameter") {
        setErrorMessage("Veuillez remplir tous les champs s'il vous plaît");
      }
      if (error.response.data.message === "Passwords are different") {
        setErrorMessage("Veuillez renseigner deux mots de passe identiques");
      }
      if (
        error.response.data.message ===
        "Cannot read properties of null (reading 'picture')"
      ) {
        setErrorMessage("Veuillez choisir une image de profil");
      }
    }
  };

  return (
    <div className="signupContainer">
      {/* partie explicative */}
      <div className="explain">
        <h1>Comment ça marche?</h1>
        <p>
          {" "}
          <span>
            <FontAwesomeIcon icon="user" />{" "}
          </span>
          Connectez vous pour avoir accès à toutes les fonctionnalités du site
        </p>
        <p>
          <span>
            <FontAwesomeIcon icon="inbox" />{" "}
          </span>
          Ajouter un film à votre collection
        </p>
        {/* <p>
          <FontAwesomeIcon icon="message" /> Leave a review for a game
        </p> */}
      </div>

      {/* partie formulaire */}
      <div className="signupForm">
        <div>
          <h1>S'enregistrer</h1>
        </div>

        <form
          className="formSign"
          onSubmit={(event) => {
            event.preventDefault();
            handleSignup();
          }}
        >
          <input
            id="username"
            value={username}
            type="text"
            placeholder="Nom d'utilisateur"
            onChange={(event) => setUsername(event.target.value)}
          />
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
            placeholder="Mot de passe"
            onChange={(event) => setPassword(event.target.value)}
          />
          <input
            id="passwordConf"
            value={passwordConf}
            type="password"
            placeholder="Confirmer le mot de passe"
            onChange={(event) => setPasswordConf(event.target.value)}
          />
          {/* ------------------------------------------------------------------------- */}
          <label htmlFor="file" className="label-file">
            <span>
              {" "}
              <FontAwesomeIcon icon="user-plus" />
            </span>
            <span> Choisir un avatar</span>
          </label>
          <input
            id="file"
            className="pickUpImg"
            type="file"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setPicture(event.target.files[0]);
            }}
          />
          {/* ------------------------------------------------------------------------- */}

          <button className="inscriptionButton" type="submit">
            Créer mon compte
          </button>
          <Link to={"/user/login"}>
            <p>Déjà un compte? Connectez-vous</p>
          </Link>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}
