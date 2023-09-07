import { React, useState, useEffect } from "react";

//import style.css
import "../Home/style.css";
import Loader from "../../components/Loader/Loader";

//import icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";
// import uuid4 from "uuid4";

//test infinite scroll---------------------
// import InfiniteScroll from "react-infinite-scroller";
//------------------------------------------------

//test import react query------------
import { useQuery } from "react-query";
//-----------------------------------

import MovieCard from "../../components/MovieCard/MovieCard";

export default function Home() {
  const [page, setPage] = useState(1);

  //useEffect pour se positionner en haut de la page en venant de character page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //test changement titre page navigateur
  useEffect(() => {
    document.title = "TMDB New movies";
  }, []);

  // const { data, isLoading, error, isFetching } = useQuery(
  //   ["data", page],
  //   async () => {
  //     const response = await axios.get(
  //       `https://site--tmdb-back--zqfvjrr4byql.code.run/home?page=${page}`
  //     );
  //     return response.data;
  //   }
  // );

  //seconde méthode avec queryKey et queryFn:
  //test avec ajout de isError: équivalent à seulement error...
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["data", page],
    queryFn: async () => {
      const response = await axios.get(
        `https://site--tmdb-back--zqfvjrr4byql.code.run/home?page=${page}`
      );

      return response.data;
    },
  });

  if (isLoading || isFetching)
    return (
      <div className="mainContainerLoader">
        <Loader />
      </div>
    );
  if (isError) {
    return <div>Une erreur s'est produite : {error.message}</div>;
  }

  return (
    <div className="mainContainer">
      {/* test react player--------------------------------------- */}
      <div className="mainContainerMinColumn">
        <h2>Films du moment</h2>
        {/* pour visualiser le retour de l'API avec data: */}
        {data && console.log(data, "log de data")}
        <div className="containerToOverflow">
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
