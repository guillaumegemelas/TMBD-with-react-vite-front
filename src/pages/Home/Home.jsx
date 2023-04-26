//A faire:
//créer des pages et des liens pour naiviguer vers films, realisateurs... (Cf gamepad)
//carroussel de photos puis
//installer pour chargement icones tournante
//voir sites similaires pour trouver features sympas

//ou style site d'actualités avec header et navbar bootstrap qui link vers des
//pages avec requetes axios vers API TMDB

import { React, useState, useEffect } from "react";

//import style.css
import "../Home/style.css";

//import icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { Link } from "react-router-dom";
import axios from "axios";
// import uuid4 from "uuid4";

import MovieCard from "../../components/MovieCard/MovieCard";

export default function Home() {
  //test requete vers API TMDB
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //à voir pour filtrer les films par pafge, date de sortie, notes...
        const response = await axios.get(
          //   "https://api.themoviedb.org/3/discover/movie?api_key=ec1d52844155d66f88c3111938c459f7"
          //test avec backend ok!
          `http://localhost:3000/home?page=${page}`
        );
        setData(response.data);
        console.log(response.data, "data page home ++++++++++++");
        setIsLoading(false);
      } catch (error) {
        console.log(error.message, "error message 🤒");
      }
    };

    fetchData();
  }, [page]);
  //penser à page dans le tableau dedépendances pour actualiser la page choisie

  return isLoading ? (
    <div className="mainContainer"></div>
  ) : (
    <div className="mainContainer">
      {/* test react player---------------------------------- */}
      <div className="mainContainerMinColumn">
        <h2>Films du moment</h2>

        <div>
          <MovieCard data={data} />
        </div>
        <div className="pagination">
          <FontAwesomeIcon icon="file" />
          <input
            type="number"
            min="1"
            max="100"
            value={page}
            placeholder="page"
            onChange={(event) => setPage(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
