import { React, useState, useEffect } from "react";

//import style.css
import "../Moviedesc/style.css";

//import icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";
import axios from "axios";
// import uuid4 from "uuid4";

import MovieCard from "../../components/MovieCard/MovieCard";

export default function Moviedesc() {
  //test requete vers API TMDB
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //à voir pour filtrer les films par pafge, date de sortie, notes...
        const response = await axios.get(
          //test avec backend ok!
          `http://localhost:3000/averagedesc?page=${page}`
        );
        setData(response.data);
        console.log(response.data, "data page movieasc ++++++++++++");
        setIsLoading(false);
      } catch (error) {
        console.log(error.message, "error message 🤒");
      }
    };

    fetchData();
  }, [page]);
  //penser à page dans le tableau dedépendances pour actualiser la page choisie

  return isLoading ? (
    <div>chargement</div>
  ) : (
    <div className="mainContainer">
      <div className="mainContainerMinColumn">
        <p>
          <FontAwesomeIcon icon="house" />
          you are on movieascpage
        </p>
        <div className="pagination">
          <input
            type="number"
            min="1"
            max="100"
            value={page}
            placeholder="page"
            onChange={(event) => setPage(event.target.value)}
          />
        </div>
        {/* Test pour voir si pages login et signup fonctionnent */}

        {/* --------------------------------------------------- */}
        <div>
          <MovieCard data={data} />
        </div>
      </div>
    </div>
  );
}
