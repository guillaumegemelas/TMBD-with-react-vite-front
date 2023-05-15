import { React, useState, useEffect } from "react";
//---------------------
import { useLocation } from "react-router-dom";
//---------------------

import axios from "axios";
import MovieCard from "../../components/MovieCard/MovieCard";

//import style.css
import "../Search/style.css";

//import du Loader
import Loader from "../../components/Loader/Loader";

export default function Search() {
  //pour la searchbar
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--tmdb-back--zqfvjrr4byql.code.run/search?query=${search}`
        );

        setData(response.data);
        console.log(response.data, "response.data search-🚸--------------");

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search]);

  return isLoading ? (
    <div className="mainContainerLoader">
      <Loader />
    </div>
  ) : (
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
