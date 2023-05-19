import React from "react";

import { useParams } from "react-router-dom";

export default function Profil() {
  //Id récupéré par params: on focus sur l'user qui s'est log sur le site
  const { id } = useParams();
  console.log(id, "Id user-----");

  return (
    <div className="signupContainer">
      <p>page Profil</p>
    </div>
  );
}
