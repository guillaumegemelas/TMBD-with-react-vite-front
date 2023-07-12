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
import Loader from "../../components/Loader/Loader";

//import icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { Link } from "react-router-dom";
import axios from "axios";
// import uuid4 from "uuid4";

//test infinite scroll------------------------
// import InfiniteScroll from "react-infinite-scroller";
//--------------------------------------------

//test import react query-----------
import { useQuery, useQueryClient } from "react-query";
//----------------------------------

import MovieCard from "../../components/MovieCard/MovieCard";

export default function Home() {
  const [page, setPage] = useState(1);

  //useEffect pour se positionner en haut de la page en venant de charachter page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //test changement titre page navigateur
  useEffect(() => {
    document.title = "TMDB New movies";
  }, []);

  const { data, isLoading, error } = useQuery(["data", page], async () => {
    const response = await fetch(
      `https://site--tmdb-back--zqfvjrr4byql.code.run/home?page=${page}`
    );
    return response.json();
  });

  if (isLoading)
    return (
      <div className="mainContainerLoader">
        <Loader />
      </div>
    );
  if (error) {
    return <div>Une erreur s'est produite : {error.message}</div>;
  }

  // Testscrollinfinite-------------------------------------------------------
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://site--tmdb-back--zqfvjrr4byql.code.run/home?page=${page}`
  //     );
  //     setData(response.data);
  //     // setPage(page + 1);
  //     console.log(response.data, "data page home ++++++++++++");
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log(error.message, "error message 🤒");
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // Testscrollinfinite----------------------------------------------------------

  //penser à page dans le tableau dedépendances pour actualiser la page choisie

  return (
    <div className="mainContainer">
      {/* test react player--------------------------------------- */}
      <div className="mainContainerMinColumn">
        <h2>Films du moment</h2>

        <div className="containerToOverflow">
          {/* <InfiniteScroll
            pageStart={0}
            loadMore={fetchData}
            hasMore={true}
            loader={
              <div className="loader" key={0}>
                Loading ...
              </div>
            }
          > */}
          <MovieCard data={data} />
          {/* </InfiniteScroll> */}
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
