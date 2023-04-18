import React from "react";
import logo from "../../img/logo.png";

//import style.css
import "../Header/style.css";

export default function Header() {
  return (
    //il faut faire un hader avec une navbar avec liens vers pages du site
    <div className="headerContainer">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
}
