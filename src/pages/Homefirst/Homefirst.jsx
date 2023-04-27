import { React } from "react";

//import style.css
import "../Homefirst/style.css";

//import de l'image de fond
// import picture from "../../img/astro.jpg";
// import picture from "../../img/joker.jpg";
// import picture from "../../img/joker2.jpg";
// import picture from "../../img/venom.jpg";
import picture from "../../img/mosaic.jpg";

//import icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Homefirst() {
  return (
    <div className="mainContainerMainPage">
      {/* test react player---------------------------------- */}

      <img src={picture} alt="mainImg" />
    </div>
  );
}
