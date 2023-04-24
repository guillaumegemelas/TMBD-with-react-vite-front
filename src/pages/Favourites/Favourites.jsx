import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import uuid4 from "uuid4";

//import style.css
import "../Favourites/style.css";

//import icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Favourites({ token }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  const navigate = useNavigate();

  //useEffect pour se positionner en haut de la page en venant de charachter page
  //   useEffect(() => {
  //     window.scrollTo(0, 0);
  //   }, []);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/favourites`, {
          //ajout bearer token pour authentification avecmiddleware
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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

  return isLoading ? (
    <div className="favoritesContainer"></div>
  ) : (
    <div className="favoritesContainer">
      <div className="favSubContainer">
        <h2>My favorites movies</h2>
        <div className="favList">
          {movies.favourites.map((even) => {
            //mettre le if avant le return pour ne retourner QUE les div voulues
            if (token === even.token) {
              return (
                <div key={uuid4()} className="favCard">
                  <div>
                    <img src={even.image} alt="" />
                    <p>{even.name}</p>
                  </div>
                  <button
                    onClick={async () => {
                      try {
                        const response = await axios.delete(
                          // `http://localhost:3000/favourites/delete/${event._id}`,
                          //déploiement Northflanck
                          `http://localhost:3000/favourites/delete/${even._id}`,
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        );
                        //pour recharger le state avec les favoris actualisés après le delete
                        setMovies(response.data);
                        console.log(response.data);
                        alert("favourite deleted");
                      } catch (error) {
                        console.log(
                          error.response,
                          "error delete fav**************"
                        );
                      }
                    }}
                  >
                    <FontAwesomeIcon icon="trash-can" />
                  </button>
                </div>
              );
            }
          })}
        </div>
      </div>

      {/* Si pas de favoris, message pas de favoris pour le moment! */}
    </div>
  );
}
