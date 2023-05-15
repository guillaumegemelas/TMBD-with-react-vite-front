import { React, useState, useEffect } from "react";

// import { Link } from "react-router-dom";
import axios from "axios";
import uuid4 from "uuid4";

//import icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import des composants
import MovieCard from "../../components/MovieCard/MovieCard";

//import du Loader
import Loader from "../../components/Loader/Loader";

//import style.css
import "../Upcoming/style.css";

export default function UpcomingMovie() {
  const [dataUp, setDataUp] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //le système de pagination
  const [page, setPage] = useState(1);

  //useEffect pour se positionner en haut de la page en venant de charachter page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  //test changement titre page navigateur
  useEffect(() => {
    document.title = `TMDB Upcoming movies`;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //à voir pour filtrer les films par pafge, date de sortie, notes...
        const response = await axios.get(
          `https://site--tmdb-back--zqfvjrr4byql.code.run/upcoming?page=${page}`
        );
        setDataUp(response.data);
        console.log(response.data, "response initiale upcoming++++");
        setIsLoading(false);
      } catch (error) {
        console.log(error.message, "error message 🤒");
      }
    };

    fetchData();
  }, [page]);

  return isLoading ? (
    <div className="mainContainerLoader">
      <Loader />
    </div>
  ) : (
    <div className="containerUpMovie">
      <div className="mainContainerMinUpColumn">
        <h2>
          {" "}
          Films à venir:{" "}
          <span className="span">
            du <span className="span">{dataUp.dates.minimum}</span> au{" "}
            <span className="span">{dataUp.dates.maximum}</span>
          </span>
        </h2>

        <div>
          <MovieCard data={dataUp} />
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
