import { React, useState, useEffect } from "react";
import logo from "../../img/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

//import icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import style.css
import "../Header/style.css";
import uuid4 from "uuid4";

export default function Header({ token, handleToken }) {
  // console.log(token, "log token header");
  //pour la searchbar
  const [search, setSearch] = useState("");

  //pour récup les users
  const [dataUsers, setDataUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  //useffect pour fetch user etl'afficher sur le header
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // const response = await axios.get("http://localhost:3000/user");
        //requete Northflanck au lieu de localhost:
        const response = await axios.get(
          "https://site--tmdb-back--zqfvjrr4byql.code.run/user"
        );

        setDataUsers(response.data.users);
        setIsLoading(false);
        console.log(
          response.data.users,
          "response get user-------------------"
        );
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search?${search}`);
  };
  return (
    <div>
      {isLoading ? (
        <div></div>
      ) : (
        //il faut faire un hader avec une navbar avec liens vers pages du site
        <div className="headerContainer">
          <div className="headerContainerMinColumn">
            <div className="firstHeader">
              <div className="logoandsearch">
                {" "}
                <div className="logo">
                  <img src={logo} alt="logo" />
                </div>{" "}
                <form className="form" onSubmit={handleSubmit}>
                  <div className="headerSearchBar">
                    <input
                      className="search"
                      value={search}
                      type="text"
                      placeholder="🔎   Rechercher..."
                      onChange={(event) => {
                        setSearch(event.target.value);
                      }}
                    />
                    <input
                      className="searchsmallscreen"
                      value={search}
                      type="text"
                      placeholder="🔎 ..."
                      onChange={(event) => {
                        setSearch(event.target.value);
                      }}
                    />
                  </div>{" "}
                  <button type="onsubmit"></button>
                </form>
                <div className="buttonGo">
                  <Link to={`/search?${search}`}>
                    <p>GO</p>
                  </Link>
                </div>
              </div>

              <div>
                {token ? (
                  <div className="connectUser1">
                    {/* test get user---------------------------- */}
                    {dataUsers.map((even) => {
                      //mettre le if avant le return pour éviter d'avoir les autres return
                      if (token === even.token) {
                        return (
                          <div className="connectUser" key={uuid4()}>
                            <div className="headerAvatar">
                              <img src={even.picture.secure_url} alt="" />
                            </div>

                            <div className="usernameHeader">
                              <p>{even.username}</p>
                            </div>
                            <div className="usernameHeader">
                              <Link to={`/user/${even._id}`}>
                                <p>Mon compte</p>
                              </Link>
                              {/* <p>{even._id}</p> */}
                            </div>
                          </div>
                        );
                      }
                    })}

                    {/* test get user---------------------------- */}
                    <div className="logandsign">
                      <p
                        className="signinbutt"
                        onClick={() => {
                          // suppression du token des cookies
                          handleToken(null);
                          alert("Vous êtes maintenant déconnecté");
                          navigate("/home");
                        }}
                      >
                        Se déconnecter
                      </p>
                      <p
                        onClick={() => {
                          // suppression du token des cookies
                          handleToken(null);
                          alert("Vous êtes maintenant déconnecté");
                          navigate("/");
                        }}
                        className="iconConn"
                      >
                        <FontAwesomeIcon icon="right-to-bracket" />
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="logandsign">
                    <Link to="/user/signup">
                      <p className="iconConn">
                        <FontAwesomeIcon icon="user-plus" />
                      </p>
                      <p className="signinbutt">S'enregister</p>
                    </Link>
                    <Link to="/user/login">
                      <p className="iconConn">
                        <FontAwesomeIcon icon="right-to-bracket" />
                      </p>
                      <p className="signinbutt">Se connecter</p>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="navBar">
              {/* on va mettre dans cette div la navbar */}
              <span className="iconnavBar">
                {" "}
                <FontAwesomeIcon icon="clapperboard" />
              </span>
              <span className="spanavBar">Films</span>
              <Link to="/home">
                <p>Du moment</p>
              </Link>
              {/* il faudra link vers la page cinéma, séries... */}
              <Link to="/movie/upcoming">
                <p>A venir</p>
              </Link>
              {/* <span>Sort by:</span> */}
              <Link to="/averageasc">
                <p>
                  <FontAwesomeIcon icon="arrow-up-wide-short" />
                </p>
              </Link>
              <Link to="/averagedesc">
                <p>
                  <FontAwesomeIcon icon="arrow-down-short-wide" />
                </p>
              </Link>
              <span className="iconnavBar">
                {" "}
                <FontAwesomeIcon icon="user-astronaut" />
              </span>
              <span className="spanavBar">Artistes</span>
              <Link to="/person/popular">
                <p>Populaires</p>
              </Link>
              {token && (
                <Link to="/favourites">
                  <p>Favoris</p>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
