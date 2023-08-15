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

import { useQuery } from "react-query";

export default function UpcomingMovie() {
  const [page, setPage] = useState(1);

  //useEffect pour se positionner en haut de la page en venant de charachter page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  //test changement titre page navigateur
  useEffect(() => {
    document.title = `TMDB Upcoming movies`;
  }, []);

  //pas besoin de try catch car REact Query gère le système d'erreur

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["data", page],
    queryFn: async () => {
      const response = await axios.get(
        `https://site--tmdb-back--zqfvjrr4byql.code.run/upcoming?page=${page}`
      );
      return response.data;
    },
  });
  // const { data, isLoading, error, isFetching } = useQuery(
  //   ["data", page],
  //   async () => {
  //     const response = await axios.get(
  //       `https://site--tmdb-back--zqfvjrr4byql.code.run/upcoming?page=${page}`
  //     );
  //     return response.data;
  //   }
  // );
  if (isLoading || isFetching)
    return (
      <div className="mainContainerLoader">
        <Loader />
      </div>
    );
  // console.log(data);
  if (error) {
    return <div>Une erreur s'est produite : {error.message}</div>;
  }

  return (
    <div className="containerUpMovie">
      <div className="mainContainerMinUpColumn">
        <h2>
          {" "}
          Films à venir:{" "}
          <span className="span">
            du <span className="span">{data.dates?.minimum}</span> au{" "}
            <span className="span">{data.dates?.maximum}</span>
            {/* ? optional chaining car erreur console */}
          </span>
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
