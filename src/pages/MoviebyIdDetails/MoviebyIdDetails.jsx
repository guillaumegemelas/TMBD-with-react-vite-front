import { React, useState, useEffect } from "react";

//import style.css
import "../MoviebyIdDetails/style.css";

import image from "../../img/movieimg.jpg";

// import { Link } from "react-router-dom";
import axios from "axios";
import uuid4 from "uuid4";
//pour récupérer l'Id venant de Home
import { useParams } from "react-router-dom";

//test caroussel react--------------------
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
//----------------------------------------

//import des composants
import MoviesimilarCard from "../../components/MoviesimilarCard/MoviesimilarCard";

export default function MoviebyIdDetails() {
  const [dataId, setDataId] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [dataIdSimilar, setDataIdSimilar] = useState([]);
  const [isLoading1, setIsLoading1] = useState(true);

  //test pour récuperer les images avec nouvelle requete
  const [dataImages, setDataImages] = useState([]);
  const [isLoading2, setIsLoading2] = useState(true);

  //test pour récuperer les perso avec nouvelle requete
  const [dataCast, setDataCast] = useState([]);
  const [isLoading3, setIsLoading3] = useState(true);

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

  //troisième requete pour les images: voir pour implanter un carroussel d'images
  useEffect(() => {
    const fetchDataImages = async () => {
      try {
        const response = await axios.get(
          // `https://api.themoviedb.org/3/movie/${id}?api_key=ec1d52844155d66f88c3111938c459f7`
          `http://localhost:3000/movie/${id}/images`
        );
        setDataImages(response.data);
        // console.log(response.data, "response data images-----------");
        setIsLoading2(false);
      } catch (error) {
        console.log(error.message, "error message 🤒");
      }
    };

    fetchDataImages();
  }, []);

  //quatrième requete pour les perso: voir pour implanter un carroussel d'images
  useEffect(() => {
    const fetchDataCast = async () => {
      try {
        const response = await axios.get(
          // `https://api.themoviedb.org/3/movie/${id}?api_key=ec1d52844155d66f88c3111938c459f7`
          `http://localhost:3000/movie/${id}/credits`
        );
        setDataCast(response.data);
        console.log(response.data, "response data cast-----------");
        setIsLoading3(false);
      } catch (error) {
        console.log(error.message, "error message 🤒");
      }
    };

    fetchDataCast();
  }, []);

  return isLoading ? (
    <div>chargement</div>
  ) : (
    <div className="containerIdMovie">
      {/* il faut essayer de mettre en background l'image ci dessous avec opacity ou couleur dominate */}
      <div className="mainContainerIdMinColumn">
        <div className="test">
          <div className="firstColumn">
            <div>
              <h1>{dataId.original_title}</h1>
            </div>

            <div className="release">
              <div>
                <span>{dataId.release_date}</span>
              </div>
              <div className="point">•</div>
              <div className="maprelease">
                {dataId.genres.map((even) => {
                  return (
                    <div key={uuid4()}>
                      <span>{even.name}, </span>
                    </div>
                  );
                })}
              </div>
              <div className="point">•</div>

              <div className="moviePB">
                {dataId.vote_average >= 7.5 && (
                  <p className="vote">
                    {Number(dataId.vote_average * 10).toFixed(0)} <span>%</span>{" "}
                  </p>
                )}
                {dataId.vote_average < 7.5 && dataId.vote_average >= 5 && (
                  <p className="vote1">
                    {Number(dataId.vote_average * 10).toFixed(0)} <span>%</span>{" "}
                  </p>
                )}
                {dataId.vote_average < 5 && dataId.vote_average >= 2.5 && (
                  <p className="vote2">
                    {Number(dataId.vote_average * 10).toFixed(0)} <span>%</span>{" "}
                  </p>
                )}
                {dataId.vote_average < 2.5 && dataId.vote_average > 0 && (
                  <p className="vote3">
                    {Number(dataId.vote_average * 10).toFixed(0)} <span>%</span>{" "}
                  </p>
                )}
              </div>
            </div>
            <div className="overview">
              <p>{dataId.overview}</p>
            </div>

            <div className="divers">
              <div className="langage">
                <span>Production companies</span>
                {dataId.production_companies.map((even) => {
                  return <div key={uuid4()}>{even.name}</div>;
                })}
              </div>
              <div className="langage">
                <span>Languages:</span>
                {dataId.spoken_languages.map((even) => {
                  //ne mettre que le premier language d'origine--
                  return <div key={uuid4()}> {even.name}</div>;
                })}
              </div>
              <div className="langage">
                <span>Popularity:</span>
                <div>{dataId.popularity}</div>
              </div>
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
      </div>
      <div className="casth2">
        <h2>Casting</h2>
      </div>
      {/* test casting------------------ */}
      <div className="castContainer"></div>
      {isLoading3 ? (
        <div></div>
      ) : (
        <div className="castCarouselImg">
          {dataCast.cast.map((even) => {
            return (
              <div className="CastingCard" key={uuid4()}>
                <div className="castImg">
                  {even.profile_path !== null ? (
                    <img
                      //   il faut concaténer l'adresse des images avec la taille
                      src={`${"https://image.tmdb.org/t/p/w500"}${
                        even.profile_path
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
                </div>{" "}
                <div>
                  <p>{even.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {/* test casting------------------ */}
      <div className="carrouselContainer">
        {isLoading2 ? (
          <div></div>
        ) : (
          <div className="carousselImg">
            <Carousel useKeyboardArrows={true}>
              {dataImages.backdrops.map((URL, index) => (
                <div className="slide" key={index}>
                  <img
                    alt="sample_file"
                    src={`${"https://image.tmdb.org/t/p/w500"}${URL.file_path}`}
                    key={index}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        )}
      </div>

      {/* il faut mettre un isloading sinon les données ne sont pas chargées et map undefined */}
      <div className="similarGlobContainer">
        {" "}
        {isLoading1 ? (
          <div>chargement</div>
        ) : (
          <div className="similarMovieContainer">
            <h1>Similar movies</h1>
            <div className="similarCarousel">
              <MoviesimilarCard data={dataIdSimilar} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
