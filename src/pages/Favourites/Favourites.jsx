import { React, useState, useEffect } from "react";
import axios from "axios";

import uuid4 from "uuid4";

//import style.css
import "../Favourites/style.css";

export default function Favourites({ token }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  //useEffect pour se positionner en haut de la page en venant de charachter page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/favourites`);
        setMovies(response.data);
        console.log(response.data, "response data favourites ***********");
        setIsloading(false);
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchFavourites();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="isLoading">
          <p>En cours de chargement...</p>
        </div>
      ) : (
        <div className="favoritesContainer">
          <div className="favSubContainer">
            <h2>My favorites movies</h2>
            <div className="favList">
              {movies.favourites.map((even) => {
                if (token === even.token) {
                  return (
                    <div key={uuid4()} className="favCard">
                      <div>
                        <img src={even.image} alt="" />
                        <p>{even.name}</p>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>

          {/* Si pas de favoris, message pas de favoris pour le moment! */}
        </div>
      )}
    </div>
  );
}
