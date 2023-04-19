//A faire:
//créer des pages et des liens pour naiviguer vers films, realisateurs... (Cf gamepad)
//carroussel de photos puis
//installer pour chargement icones tournante
//voir sites similaires pour trouver features sympas

//ou style site d'actualités avec header et navbar bootstrap qui link vers des
//pages avec requetes axios vers API TMDB

import { React, useState, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
// import uuid4 from "uuid4";

import MovieCard from "../components/MovieCard/MovieCard";

export default function Home() {
  //test requete vers API TMDB
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //à voir pour filtrer les films par pafge, date de sortie, notes...
        const response = await axios.get(
          //   "https://api.themoviedb.org/3/discover/movie?api_key=ec1d52844155d66f88c3111938c459f7"
          //test avec backend ok!
          "http://localhost:3000/"
        );
        setData(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message, "error message 🤒");
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <div>chargement</div>
  ) : (
    <div className="mainContainer">
      <p>you are on the home page </p>
      {/* Test pour voir si pages login et signup fonctionnent */}
      <Link to="/user/login">
        <p>vers la page login</p>
      </Link>
      <Link to="/user/signup">
        <p>vers la page signup</p>
      </Link>
      {/* --------------------------------------------------- */}
      <div>
        <MovieCard data={data} />
      </div>
    </div>
  );
}
