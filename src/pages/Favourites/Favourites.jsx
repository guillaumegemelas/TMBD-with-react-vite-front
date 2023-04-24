import { React, useState, useEffect } from "react";

//import style.css
import "../Favourites/style.css";

export default function Favourites() {
  return (
    <div className="favoritesContainer">
      <p>you are on the favorites page</p>
      {/* Si pas de favoris, message pas de favoris pour le moment! */}
    </div>
  );
}
