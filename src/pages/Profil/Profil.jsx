import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//import style.css
import "../Profil/style.css";

export default function Profil({ handleToken, token }) {
  //Id récupéré par params: on focus sur l'user qui s'est log sur le site
  const { id } = useParams();
  console.log(id, "Id user page Profil-----");

  //partie data user Id---------------
  const [dataUserId, setDataUserId] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //partie form modif infos user---------------
  const [usernameToModify, setUsernameToModify] = useState("");
  const [emailToModify, setEmailToModify] = useState("");
  const [passwordToModify, setPasswordToModify] = useState("");
  const [passwordConfToModify, setPasswordConfToModify] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // formdata pour cloudinary---------------------------------------------
  const [pictureToModify, setPictureToModify] = useState();
  //--------------------------------------------------------------------------

  const navigate = useNavigate();

  //test changement titre page navigateur
  useEffect(() => {
    document.title = `TMDB Profil`;
  }, []);

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

  //-------------------------------------------------------------------------------------

  const handleProfilModify = async () => {
    setErrorMessage("");
    try {
      //formdata pour cloudinary---------------------------------------------
      const formData = new FormData();
      formData.append("username", usernameToModify);
      formData.append("email", emailToModify);
      formData.append("password", passwordToModify);
      formData.append("passwordConf", passwordConfToModify);
      formData.append("picture", pictureToModify);

      //------------------------------------------------------------------

      const response = await axios.put(
        `https://site--tmdb-back--zqfvjrr4byql.code.run/user/update/${id}`,

        formData,
        {
          //ajout bearer token pour authentification avecmiddleware
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.token) {
        handleToken(response.data.token);
        alert("Votre compte a été modifié avec succès");
        navigate("/home");
      } else {
        alert("Votre compte a été modifié avec succès sans token");
        navigate("/home");
      }
    } catch (error) {
      console.log(error.response.data, "erreur signup");

      if (error.response.data.message === "This username is already used") {
        setErrorMessage(
          "Ce nom d'utilisateur est déjà utilisé, veuillez créer un compte avec un nom d'utilisateur valide"
        );
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
  //-------------------------------------------------------------------------------------

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
            handleProfilModify();
          }}
        >
          <div className="formInput2">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              id="username"
              value={usernameToModify}
              type="text"
              placeholder={dataUserId.username}
              onChange={(event) => setUsernameToModify(event.target.value)}
            />
          </div>
          <div className="formInput2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              value={emailToModify}
              type="text"
              placeholder={dataUserId.email}
              onChange={(event) => setEmailToModify(event.target.value)}
            />
          </div>
          <div className="formInput2">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              value={passwordToModify}
              type="password"
              placeholder="Mot de passe"
              onChange={(event) => setPasswordToModify(event.target.value)}
            />
          </div>

          <div className="formInput2">
            <label htmlFor="passwordConf">Confirmer mot de passe</label>
            <input
              id="passwordConf"
              value={passwordConfToModify}
              type="password"
              placeholder="Confirmer le mot de passe"
              onChange={(event) => setPasswordConfToModify(event.target.value)}
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
                setPictureToModify(event.target.files[0]);
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
