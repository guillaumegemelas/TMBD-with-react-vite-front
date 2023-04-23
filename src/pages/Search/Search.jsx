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
  const regex = /%20/g;

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
        <div className="searchh1">
          <h2>Search for: {search.replace(regex, " ").slice(1, 35)}</h2>
        </div>

        <div>
          <MovieCard data={data} />
        </div>
        {data.results.length === 0 && (
          <div>
            {" "}
            <h2>No result for "{search.replace(regex, " ").slice(1, 35)}"</h2>
          </div>
        )}
      </div>
    </div>
  );
}
