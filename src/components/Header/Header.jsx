import React from "react";
import logo from "../../img/logo.png";
import { Link } from "react-router-dom";

//import style.css
import "../Header/style.css";

export default function Header() {
  return (
    //il faut faire un hader avec une navbar avec liens vers pages du site
    <div className="headerContainer">
      <div className="headerContainerMinColumn">
        <div className="firstHeader">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div>ici sera la searchbar</div>
        </div>

        <div className="navBar">
          {/* on va mettre dans cette div la navbar */}
          <Link to="/">
            <p>News</p>
          </Link>
          {/* il faudra link vers la page cinéma, séries... */}
          <p>Upcoming</p>
          <p>Séries</p>
        </div>
      </div>
    </div>
  );
}
