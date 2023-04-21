import { React, useState, useEffect } from "react";

//import style.css
import "../MoviebyIdDetails/style.css";

// import { Link } from "react-router-dom";
import axios from "axios";
import uuid4 from "uuid4";
//pour récupérer l'Id venant de Home
import { useParams } from "react-router-dom";

//import des composants
import MoviesimilarCard from "../../components/MoviesimilarCard/MoviesimilarCard";

export default function MoviebyIdDetails() {
  const [dataId, setDataId] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [dataIdSimilar, setDataIdSimilar] = useState([]);
  const [isLoading1, setIsLoading1] = useState(true);

  //Id récupéré par params
  const { id } = useParams();
  console.log(id, "Id d movie-----");

  useEffect(() => {
    const fetchData = async () => {
      try {
        //à voir pour filtrer les films par pafge, date de sortie, notes...
        const response = await axios.get(
          // `https://api.themoviedb.org/3/movie/${id}?api_key=ec1d52844155d66f88c3111938c459f7`
          `http://localhost:3000/movie/${id}`
        );
        setDataId(response.data);
        console.log(response.data, "response initiale++++");
        setIsLoading(false);
      } catch (error) {
        console.log(error.message, "error message 🤒");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataSimilar = async () => {
      try {
        //à voir pour filtrer les films par pafge, date de sortie, notes...
        const response = await axios.get(
          // `https://api.themoviedb.org/3/movie/${id}?api_key=ec1d52844155d66f88c3111938c459f7`
          `http://localhost:3000/movie/${id}/similar`
        );
        setDataIdSimilar(response.data);
        // console.log(response.data, "response data similar-----------");
        setIsLoading1(false);
      } catch (error) {
        console.log(error.message, "error message 🤒");
      }
    };

    fetchDataSimilar();
  }, []);

  return isLoading ? (
    <div>chargement</div>
  ) : (
    <div className="containerIdMovie">
      {/* il faut essayer de mettre en background l'image ci dessous avec opacity ou couleur dominate */}
      <div className="mainContainerIdMinColumn">
        <div className="firstColumn">
          <h1>{dataId.original_title}</h1>
          <h2>Realeased date: {dataId.release_date}</h2>
          <p>{dataId.overview}</p>
          <p>Popularity: {dataId.popularity}</p>
          <p>Revenue: {dataId.popularity}</p>
          <div>
            {dataId.production_companies.map((even) => {
              return <div key={uuid4()}>{even.name}</div>;
            })}
          </div>
          <div>
            {dataId.spoken_languages.map((even) => {
              //ne mettre que le premier language d'origine--
              return <div key={uuid4()}>Languages: {even.name}</div>;
            })}
          </div>
        </div>

        <div className="movieIdImg">
          <img
            //   il faut concaténer l'adresse des images avec la taille
            src={`${"https://image.tmdb.org/t/p/w500"}${dataId.poster_path}`}
            alt=""
          />
        </div>
      </div>
      {/* test similar movies------------------- */}
      {/* il faut mettre un isloading sinon les données ne sont pas chargées et map undefined */}
      {isLoading1 ? (
        <div>chargement</div>
      ) : (
        <div className="similarMovieContainer">
          <h1>Films similaires:</h1>
          <div className="similarCarousel">
            <MoviesimilarCard data={dataIdSimilar} />
          </div>
        </div>
      )}

      {/* fin test similar movies----------------- */}
    </div>
  );
}
