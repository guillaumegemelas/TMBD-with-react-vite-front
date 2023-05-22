import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

//import style.css
import "../Profil/style.css";

export default function Profil() {
  //Id récupéré par params: on focus sur l'user qui s'est log sur le site
  const { id } = useParams();
  console.log(id, "Id user page Profil-----");

  const [dataUserId, setDataUserId] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //on va chercher les infos du user par rapport à son id:
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        // const response = await axios.get("http://localhost:3000/user");
        //requete Northflanck au lieu de localhost:
        const response = await axios.get(
          `https://site--tmdb-back--zqfvjrr4byql.code.run/user/${id}`
        );

        setDataUserId(response.data.user);
        setIsLoading(false);
        console.log(
          response.data.user,
          "response get userId-------------------"
        );
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchUserId();
  }, []);

  return isLoading ? (
    <div className="favoritesContainer"></div>
  ) : (
    <div className="signupContainerProfil">
      <div className="profilPicture">
        {/* <h1>Photo de Profil</h1> */}
        <img src={dataUserId.picture.secure_url} alt="profilPicture" />
      </div>

      {/* partie formulaire */}
      <div className="signupFormProfil">
        <div>
          <h1>Mes informations</h1>
        </div>

        <form
          className="formSign2"
          onSubmit={(event) => {
            event.preventDefault();
            handleSignup();
          }}
        >
          <div className="formInput2">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              id="username"
              value={username}
              type="text"
              placeholder={dataUserId.username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="formInput2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              value={email}
              type="text"
              placeholder={dataUserId.email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="formInput2">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              value={password}
              type="password"
              placeholder="Mot de passe"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="formInput2">
            <label htmlFor="passwordConf">Confirmer mot de passe</label>
            <input
              id="passwordConf"
              value={passwordConf}
              type="password"
              placeholder="Confirmer le mot de passe"
              onChange={(event) => setPasswordConf(event.target.value)}
            />
          </div>

          {/* ---------------------------------------------------------------------------- */}
          <div className="profilButtonAvatar">
            <label htmlFor="file" className="label-file">
              <span> Modifier mon avatar</span>
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
          </div>

          {/* ------------------------------------------------------------------------- */}
          <div className="profilButton">
            <button className="inscriptionButton" type="submit">
              Enregistrer mes informations
            </button>
          </div>

          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}
