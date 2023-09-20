import { React, useState, useEffect } from "react";
import { useQuery } from "react-query";

//import style.css
import "../Moviedesc/style.css";

//import icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";
// import uuid4 from "uuid4";

//import du Loader
import Loader from "../../components/Loader/Loader";

import MovieCard from "../../components/MovieCard/MovieCard";

export default function Moviedesc() {
  const [page, setPage] = useState(1);

  //useEffect pour se positionner en haut de la page en venant de character page!
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  //test changement titre page navigateur.
  useEffect(() => {
    document.title = `TMDB`;
  }, []);

  const { data, isLoading, error, isFetching } = useQuery(
    ["data", page],
    async () => {
      const response = await fetch(
        `https://site--tmdb-back--zqfvjrr4byql.code.run/averagedesc?page=${page}`
      );
      return response.json();
    }
  );

  if (isLoading || isFetching)
    return (
      <div className="mainContainerLoader">
        <Loader />
      </div>
    );
  if (error) {
    return <div>Une erreur s'est produite : {error.message}</div>;
  }

  return (
    <div className="mainContainer">
      <div className="mainContainerMinColumn">
        <h2>
          Films les mieux notés<span></span>
        </h2>
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
