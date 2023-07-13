import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";

import axios from "axios";

//import style.css
import "../Search/style.css";

import Loader from "../../components/Loader/Loader";
import MovieCard from "../../components/MovieCard/MovieCard";

export default function Search() {
  const regex = /%20/g;
  const regex1 = /%27/g;

  //-----------------------
  const location = useLocation();
  // ----------------------
  //il faut récupérer search pour l'envoyer dans la requête avec useLocation()
  const search = location.search;
  console.log(search);
  //-----------------------

  //useEffect pour se positionner en haut de la page en venant de charachter page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //test changement titre page navigateur-----------
  useEffect(() => {
    document.title = `TMDB ▷ ${search
      .replace(regex, " ")
      .replace(regex1, "'")
      .slice(1, 35)}`;
  }, []); //------------------------------------------------

  const { data, isLoading, error, isFetching } = useQuery(
    ["data", search],
    async () => {
      const response = await axios.get(
        `https://site--tmdb-back--zqfvjrr4byql.code.run/search?query=${search}`
      );
      return response.data;
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
    <div className="mainSearchContainer">
      <div className="mainSearchContainerMinColumn">
        <div className="searchh1">
          <h2>
            Résultats pour:{" "}
            {search.replace(regex, " ").replace(regex1, "'").slice(1, 35)}
          </h2>
        </div>

        <div>
          <MovieCard data={data} />
        </div>
        {data.results.length === 0 && (
          <div>
            {" "}
            <h2>
              Aucun résultat pour "
              {search.replace(regex, " ").replace(regex1, "'").slice(1, 35)}"
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
