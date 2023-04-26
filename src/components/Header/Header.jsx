import { React, useState, useEffect } from "react";
import logo from "../../img/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

//import icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import style.css
import "../Header/style.css";

export default function Header({ token, handleToken }) {
  // console.log(token, "log token header");
  //pour la searchbar
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  return (
    //il faut faire un hader avec une navbar avec liens vers pages du site
    <div className="headerContainer">
      <div className="headerContainerMinColumn">
        <div className="firstHeader">
          <div className="logoandsearch">
            {" "}
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
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
            </div>
            <div className="buttonGo">
              <Link to={`/search?${search}`}>
                <p>GO</p>
              </Link>
            </div>
          </div>

          <div>
            {token ? (
              <div className="logandsign">
                <p
                  onClick={() => {
                    // suppression du token des cookies
                    handleToken(null);
                    alert("Vous êtes maintenant déconnecté");
                    navigate("/");
                  }}
                >
                  Se déconnecter
                </p>
              </div>
            ) : (
              <div className="logandsign">
                <Link to="/user/signup">
                  <p className="signinbutt">S'enregister</p>
                </Link>
                <Link to="/user/login">
                  <p>Se connecter</p>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="navBar">
          {/* on va mettre dans cette div la navbar */}
          <span>Films</span>
          <Link to="/">
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
          <Link to="/person/popular">
            <p>Artistes</p>
          </Link>
          {token && (
            <Link to="/favourites">
              <p>Favourites</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
