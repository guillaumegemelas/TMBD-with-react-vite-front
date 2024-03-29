import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//import style.css
import "../Profil/style.css";

//import icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Loader from "../../components/Loader/Loader";

export default function Profil({ handleToken, token }) {
  //Id récupéré par params: on focus sur l'user qui s'est log sur le site
  const { id } = useParams();
  console.log(id, "Id user page Profil-----");

  //partie data user Id---------------
  const [dataUserId, setDataUserId] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //-----------test loader pendant requet au back-----------
  const [isLoadingLoader, setIsLoadingLoader] = useState(false);
  //--------------------------------------------------------

  //visibilité modale: 3 states pour 3 modales------------------
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  //------------------------------------------------------

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
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchUserId = async () => {
      try {
        // const response = await axios.get("http://localhost:3000/user");
        //requete Northflanck au lieu de localhost:
        const response = await axios.get(
          `https://site--tmdb-back--zqfvjrr4byql.code.run/user/${id}`,
          {
            cancelToken: signal.token,
          }
        );

        setDataUserId(response.data.user);
        setIsLoading(false);
        console.log(
          response.data.user,
          "response get userId-------------------"
        );
      } catch (error) {
        console.log(error.message, "error message");
        console.log(error.response, "error response");
      }
    };
    fetchUserId();
    return () => {
      abortController.abort();
    };
  }, []);

  //-------------------------------------------------------------------------------------

  const handleProfilModify = async () => {
    setErrorMessage("");
    setIsLoadingLoader(true);

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
        setIsLoadingLoader(false);
        // alert("Votre compte a été modifié avec succès");
        // navigate("/home");
        //-----------------------
        setVisible2(true);
        // la fonction seTimeout pour fermer la modal après 3 secondes
        setTimeout(() => {
          setVisible2(false);
          navigate("/home");
        }, 3000);
        //-----------------------
      } else {
        alert("Votre compte a été modifié avec succès sans token");
        navigate("/home");
      }
    } catch (error) {
      console.log(error.response, "erreur signup");
      setIsLoadingLoader(false);
      if (error.response.data.message === "This username is already used") {
        setErrorMessage(
          "Ce nom d'utilisateur est déjà utilisé, veuillez créer un compte avec un nom d'utilisateur valide"
        );
      }

      if (error.response.data.message === "Passwords are different") {
        setErrorMessage("Veuillez renseigner deux mots de passe identiques");
      }
      if (
        error.response.data ===
        "Cannot read properties of null (reading 'picture')"
      ) {
        setErrorMessage("Veuillez choisir une image de profil");
      }
    }
  };
  //-------------------------------------------------------------------------------------
  //fonction pour suppression du compte

  const submitDelete = async () => {
    try {
      const response = await axios.delete(
        `https://site--tmdb-back--zqfvjrr4byql.code.run/user/delete/${id}`,
        {
          //ajout bearer token pour authentification avec middleware
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleToken(null);
      // alert("Profil supprimé");
      // navigate("/home");
      //-----------------------
      setVisible3(true);
      // la fonction seTimeout pour fermer la modal après 3 secondes
      setTimeout(() => {
        setVisible3(false);
        navigate("/home");
      }, 3000);
      //-----------------------
    } catch (error) {
      console.log(error.message);
    }
  };

  //------------------------------------

  return isLoading ? (
    <div className="favoritesContainer"></div>
  ) : isLoadingLoader ? (
    <div className="signupContainerProfil">
      <div className="loaderProfil">
        <Loader />
      </div>
    </div>
  ) : (
    <div className="signupContainerProfil">
      <div className="profilPicture">
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

          <div className="profilButtonAvatar">
            <label htmlFor="file" className="label-file">
              <span>
                <FontAwesomeIcon icon="user-plus" />{" "}
              </span>
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

          <div className="profilButton">
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <button className="inscriptionButton" type="submit">
              Enregistrer mes informations
            </button>
          </div>
          <div className="profilButtonRemove">
            <p
              onClick={() => {
                setVisible(true);
              }}
            >
              <span>
                <FontAwesomeIcon icon="user-slash" />{" "}
              </span>
              Supprimer mon compte{" "}
            </p>
          </div>
        </form>
        {/* modal pour le choix avant suppression------------------------ */}
        <div>
          {visible && (
            <div className="mainModal">
              <div className="mainModalChoiceBox">
                <div>
                  <p>Etes vous sûre de vouloir supprimer votre compte?</p>
                </div>
                <div className="buttonChoice">
                  <p onClick={submitDelete}>Oui</p>
                  <p
                    onClick={() => {
                      setVisible(false);
                    }}
                  >
                    Non
                  </p>
                </div>
              </div>
            </div>
          )}{" "}
        </div>
        {/* modal pour le choix avant suppression------------------------ */}
        {/* modal pour la confirm de la mise à jour des infos------------------------ */}
        <div>
          {visible2 && (
            <div className="mainModal">
              <div className="mainModalChoiceBox">
                <div>
                  <p style={{ color: "black" }}>
                    Votre compte a bien été mis à jour
                  </p>
                </div>
              </div>
            </div>
          )}{" "}
        </div>
        {/* modal pour la confirm de la mise à jour des infos------------------------ */}
        {/* modal pour la confirm de la suppression des infos------------------------ */}
        <div>
          {visible3 && (
            <div className="mainModal">
              <div className="mainModalChoiceBox">
                <div>
                  <p style={{ color: "black" }}>
                    Votre compte a bien été supprimé
                  </p>
                </div>
              </div>
            </div>
          )}{" "}
        </div>
        {/* modal pour la confirm de la mise à jour des infos------------------------ */}
      </div>
    </div>
  );
}
