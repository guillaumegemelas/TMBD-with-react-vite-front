import { React, useState, useEffect } from "react";
//---------------------
import { useLocation } from "react-router-dom";
//---------------------

import axios from "axios";
import MovieCard from "../../components/MovieCard/MovieCard";

//import style.css
import "../Search/style.css";

export default function Search() {
  //pour la searchbar
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  //-----------------------
  const location = useLocation();
  // ----------------------
  //il faut récupérer search pour l'envoyer dans la requête avec useLocation()
  const search = location.search;
  console.log(search);
  //-----------------------

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/search?query=${search}`
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
    <div>chargement</div>
  ) : (
    <div className="mainSearchContainer">
      <div className="mainSearchContainerMinColumn">
        <h1>Search for: {search}</h1>
        <div>
          <MovieCard data={data} />
        </div>
      </div>
    </div>
  );
}
