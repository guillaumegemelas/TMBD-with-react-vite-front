import { React, useState, useEffect } from "react";
import logo from "../../img/logo1.png";
import { Link } from "react-router-dom";
import axios from "axios";

//import icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import style.css
import "../Header/style.css";

export default function Header() {
  //pour la searchbar
  const [data, setData] = useState();
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  //requete pour la searchbar : finaliser et voir comment faire la requete: dans k-le header
  //et aller vers la page search ou state search et requete sur la page search
  //quoi qu'il en soit la requete fonctionne!!
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/search?query=${search}`
        );

        setData(response.data);
        console.log(response.data, "response.data search-🚸--------------");
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search]);
  //-------------------------------------------------------------------------+++++

  return (
    //il faut faire un hader avec une navbar avec liens vers pages du site
    <div className="headerContainer">
      {isLoading ? (
        <div className="isLoading"></div>
      ) : (
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
                  placeholder="🔎   Search"
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="logandsign">
              <Link to="/user/signup">
                <p>Sign in</p>
              </Link>
              <Link to="/user/login">
                <p>Login</p>
              </Link>
            </div>
          </div>

          <div className="navBar">
            {/* on va mettre dans cette div la navbar */}
            <Link to="/">
              <p>News</p>
            </Link>
            {/* il faudra link vers la page cinéma, séries... */}
            <Link to="/movie/upcoming">
              <p>Upcoming</p>
            </Link>
            <span>Sort by:</span>
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
          </div>
        </div>
      )}
    </div>
  );
}
