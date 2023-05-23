import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import uuid4 from "uuid4";
import Loader from "../../components/Loader/Loader";

//------pour récup Id de header------------
import { useParams } from "react-router-dom";
//-----------------------------------------

//import style.css
import "../Favourites/style.css";

//import icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Favourites({ token }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  //Id récupéré par params------------------------
  const { id } = useParams();
  console.log(id, "Id user-----");
  //----------------------------------------------

  const navigate = useNavigate();

  //useEffect pour se positionner en haut de la page en venant de charachter page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //test changement titre page navigateur
  useEffect(() => {
    document.title = `TMDB Favourites movies`;
  }, []);

  //useEffect pour se positionner en haut de la page en venant de charachter page
  //il va falloir faire une requete au user pour récupérer le userId-----------
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get(
          `https://site--tmdb-back--zqfvjrr4byql.code.run/favourites/${id}`,
          {
            //ajout bearer token pour authentification avecmiddleware
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
  //----------------------------------------------------------------------------

  // useEffect(() => {
  //   const fetchFavourites = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://site--tmdb-back--zqfvjrr4byql.code.run/favourites`,
  //         {
  //           //ajout bearer token pour authentification avecmiddleware
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       setMovies(response.data);
  //       console.log(response.data, "response data favourites ***********");
  //       setIsloading(false);
  //     } catch (error) {
  //       console.log(error.message);
  //       console.log(error.response);
  //     }
  //   };
  //   fetchFavourites();
  // }, []);

  return isLoading ? (
    <div className="mainContainerLoader">
      <Loader />
    </div>
  ) : (
    <div className="favoritesContainer">
      <div className="favSubContainer">
        <h2>Mes films préférés</h2>
        <div className="favList">
          {movies.favourites.map((even) => {
            //mettre le if avant le return pour ne retourner QUE les div voulues
            // if (token === even.token) {
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
                        `https://site--tmdb-back--zqfvjrr4byql.code.run/favourites/delete/${even._id}/${id}`,
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      );
                      //pour recharger le state avec les favoris actualisés après le delete

                      setMovies(response.data);
                      console.log(
                        response.data,
                        "response.data favourites delete++++++++++++++++"
                      );
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
            // }
          })}
        </div>
      </div>

      {/* Si pas de favoris, message pas de favoris pour le moment! */}
    </div>
  );
}
