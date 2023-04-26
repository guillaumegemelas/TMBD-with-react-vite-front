import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

//import style.css
import "../CastByIdDetails/style.css";

import image from "../../img/movieimg.jpg";

import axios from "axios";
import uuid4 from "uuid4";
import MovieCard from "../../components/MovieCard/MovieCard";

//pour récupérer l'Id venant de Home
import { useParams } from "react-router-dom";

export default function CastByIdDetails() {
  const [dataCastId, setDataCastId] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [dataCastIdEn, setDataCastIdEn] = useState([]);
  const [isLoading2, setIsLoading2] = useState(true);

  //pour les films associés au personnage
  const [dataCastIdMovie, setDataCastIdMovie] = useState([]);
  const [isLoading1, setIsLoading1] = useState(true);

  //Id récupéré par params
  const { id } = useParams();
  console.log(id, "Id cast-----");

  const navigate = useNavigate();

  //useEffect pour se positionner en haut de la page en venant de charachter page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchDataCastId = async () => {
      try {
        //à voir pour filtrer les films par pafge, date de sortie, notes...
        const response = await axios.get(
          // `https://api.themoviedb.org/3/movie/${id}?api_key=ec1d52844155d66f88c3111938c459f7`
          `http://localhost:3000/cast/${id}`
        );
        setDataCastId(response.data);
        console.log(response.data, "response cast id***");
        setIsLoading(false);
      } catch (error) {
        console.log(error.message, "error message 🤒");
      }
    };

    fetchDataCastId();
  }, []);

  //pour requete en anglais
  useEffect(() => {
    const fetchDataCastIdEn = async () => {
      try {
        //à voir pour filtrer les films par pafge, date de sortie, notes...
        const response = await axios.get(
          // `https://api.themoviedb.org/3/movie/${id}?api_key=ec1d52844155d66f88c3111938c459f7`
          `http://localhost:3000/cast/en/${id}`
        );
        setDataCastIdEn(response.data);
        console.log(response.data, "response cast id en***");
        setIsLoading2(false);
      } catch (error) {
        console.log(error.message, "error message 🤒");
      }
    };

    fetchDataCastIdEn();
  }, []);

  useEffect(() => {
    const fetchDataCastIdMovie = async () => {
      try {
        //à voir pour filtrer les films par pafge, date de sortie, notes...
        const response = await axios.get(
          // `https://api.themoviedb.org/3/movie/${id}?api_key=ec1d52844155d66f88c3111938c459f7`
          `https://site--tmdb-back--zqfvjrr4byql.code.run/cast/${id}/movie`
        );
        setDataCastIdMovie(response.data);
        console.log(response.data, "response cast id movie---");
        setIsLoading1(false);
      } catch (error) {
        console.log(error.message, "error message 🤒");
      }
    };

    fetchDataCastIdMovie();
  }, []);

  return isLoading ? (
    <div className="castContainerbyId"></div>
  ) : (
    <div className="castContainerbyId">
      <div className="test1">
        <div className="firstColumn1">
          <div className="castImg1">
            {dataCastId.profile_path !== null ? (
              <img
                //   il faut concaténer l'adresse des images avec la taille
                src={`${"https://image.tmdb.org/t/p/w500"}${
                  dataCastId.profile_path
                }`}
                alt="imgsimilar"
              />
            ) : (
              <img
                //   il faut concaténer l'adresse des images avec la taille
                src={image}
                alt="imgsimilarbis"
              />
            )}
          </div>
          <div className="secondCastColumn">
            {" "}
            <div className="nameandbirth">
              <h2>{dataCastId.name}</h2>
              <div className="point">•</div>
              <p>{dataCastId.birthday}</p>
              <div className="point">•</div>
              <div className="moviePB">
                {dataCastId.popularity >= 7.5 && (
                  <p className="vote">
                    {Number(dataCastId.popularity).toFixed(0)} <span>%</span>{" "}
                  </p>
                )}
                {dataCastId.popularity < 7.5 && dataCastId.popularity >= 5 && (
                  <p className="vote1">
                    {Number(dataCastId.popularity).toFixed(0)} <span>%</span>{" "}
                  </p>
                )}
                {dataCastId.popularity < 5 && dataCastId.popularity >= 2.5 && (
                  <p className="vote2">
                    {Number(dataCastId.popularity).toFixed(0)} <span>%</span>{" "}
                  </p>
                )}
                {dataCastId.popularity < 2.5 && dataCastId.popularity > 0 && (
                  <p className="vote3">
                    {Number(dataCastId.popularity).toFixed(0)} <span>%</span>{" "}
                  </p>
                )}
              </div>
            </div>
            <div className="biography">
              <p>{dataCastId.biography}</p>
              {!isLoading2 && <p>{dataCastIdEn.biography}</p>}
            </div>
          </div>
        </div>
      </div>
      <div className="movieIdCastContainer">
        <h2>Films associés</h2>
        {isLoading1 ? (
          <div></div>
        ) : (
          <div className="movie1CarouselImg">
            {dataCastIdMovie.cast.map((even) => {
              return (
                <div key={uuid4()} className="movie1Card">
                  <Link to={`/movie/${even.id}`}>
                    <div className="movie1CardImg">
                      {even.poster_path !== null ? (
                        <img
                          //   il faut concaténer l'adresse des images avec la taille
                          src={`${"https://image.tmdb.org/t/p/w500"}${
                            even.poster_path
                          }`}
                          alt="imgsimilar"
                        />
                      ) : (
                        <img
                          //   il faut concaténer l'adresse des images avec la taille
                          src={image}
                          alt="imgsimilarbis"
                        />
                      )}
                    </div>
                    <div className="movie1CardDesc">
                      <div className="movie1Title">
                        <h1>{even.original_title}</h1>
                      </div>
                      <div className="movieP">
                        <p>{even.release_date}</p>
                        {even.vote_average >= 7.5 && (
                          <p className="vote">
                            {Number(even.vote_average * 10).toFixed(0)}{" "}
                            <span>%</span>{" "}
                          </p>
                        )}
                        {even.vote_average < 7.5 && even.vote_average >= 5 && (
                          <p className="vote1">
                            {Number(even.vote_average * 10).toFixed(0)}{" "}
                            <span>%</span>{" "}
                          </p>
                        )}
                        {even.vote_average < 5 && even.vote_average >= 2.5 && (
                          <p className="vote2">
                            {Number(even.vote_average * 10).toFixed(0)}{" "}
                            <span>%</span>{" "}
                          </p>
                        )}
                        {even.vote_average < 2.5 && even.vote_average > 0 && (
                          <p className="vote3">
                            {Number(even.vote_average * 10).toFixed(0)}{" "}
                            <span>%</span>{" "}
                          </p>
                        )}
                        {even.vote_average <= 0 && <p className="vote4">NR</p>}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
