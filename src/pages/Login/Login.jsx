import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  useNavigate,
  Link,
  // useLocation
} from "react-router-dom";

//import style.css
import "../Login/style.css";

//import icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Login({ handleToken }) {
  //variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  //test dataUsername-------------------------------------
  const [usernameFetch, setUsernameFetch] = useState("");
  //------------------------------------------------------

  //pour naviguer vers la page Home--
  const navigate = useNavigate();

  //visibilité modale--------------------------------------
  const [visible, setVisible] = useState(false);
  //-------------------------------------------------------

  //test changement titre page navigateur
  useEffect(() => {
    document.title = `TMDB Login`;
  }, []);

  //décalaration de fonction pour requete vers Backend
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://site--tmdb-back--zqfvjrr4byql.code.run/user/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      setUsernameFetch(response.data.username);

      //si le token existe (donc si le user est déjà en BDD)
      if (response.data.token) {
        handleToken(response.data.token);
        console.log(response.data.token);
        // alert("Vous êtes maintenant connecté");
        // navigate("/home");
        //-----------------------
        setVisible(true);
        // la fonction seTimeout pour fermer la modal après 3 secondes
        setTimeout(() => {
          setVisible(false);
          navigate("/home");
        }, 3000);
        //-----------------------
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
      {/* partie explicative */}
      <div className="explain">
        <h1>Comment ça marche?</h1>
        <p>
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
      </div>
      <div className="signupForm">
        <div className="1">
          <h1>Se connecter</h1>
        </div>

        <form
          className="formSign1"
          onSubmit={(event) => {
            event.preventDefault();
            // console.log(event.currentTarget);
            // console.log(event.target);
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
          {/* si on veut rajouter un input de type date pour enregistrer la date de naissance par exemple
          on pourrait étendre l'idée à laisser entrer sur le site que les personnes qui ont 18 ans par exemple */}
          {/* <input type="date" /> */}
          <input
            id="password"
            value={password}
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="2" type="submit">
            Se connecter
          </button>

          <Link to={"/user/signup"}>
            <p>Pas encore de compte? Merci de vous enregistrer</p>
          </Link>
          {/* génération du message d'erreur */}
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </form>
        {/* partie modal pour confirmation-------------------------- */}
        <div>
          {visible && (
            <div className="mainModal">
              <div className="mainModalChoiceBox">
                <div className="textModal">
                  <span style={{ color: "black" }}>
                    Content de vous revoir <span>{usernameFetch}</span> !
                  </span>
                  <p style={{ color: "black" }}>
                    Vous êtes maintenant connecté
                  </p>
                </div>
              </div>
            </div>
          )}{" "}
        </div>
        {/* partie modal pour confirmation-------------------------- */}
      </div>
    </div>
  );
}
