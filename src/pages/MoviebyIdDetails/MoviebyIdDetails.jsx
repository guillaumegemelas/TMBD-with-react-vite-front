import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import uuid4 from "uuid4";

//import style.css
import "../MoviebyIdDetails/style.css";

import image from "../../img/movieimg.jpg";

//import de la modale vidéo--------------
import ModalVideo from "react-modal-video";
//----------------------------------------------------

//import du Loader
import Loader from "../../components/Loader/Loader";

//import test de react player
import ReactPlayer from "react-player";

//pour récupérer l'Id venant de Home
import { useParams } from "react-router-dom";

//import icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//caroussel react
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

//import des composants
import MoviesimilarCard from "../../components/MoviesimilarCard/MoviesimilarCard";

export default function MoviebyIdDetails({ token }) {
  // console.log(token, "log de token+++++++++");

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

  //pour la modale vidéo-------------------------------
  const [dataVideos, setDataVideos] = useState([]);
  const [isLoading4, setIsLoading4] = useState(true);
  const [isOpen, setOpen] = useState(false);
  //---------------------------------------------------

  //visibilité modale-------------------------------------
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  //------------------------------------------------------

  //Id récupéré par params
  const { id } = useParams();
  console.log(id, "Id d movie-----");

  const navigate = useNavigate();

  //useEffect pour se positionner en haut de la page en venant de charachter page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      try {
        //à voir pour filtrer les films par pafge, date de sortie, notes...
        const response = await axios.get(
          `https://site--tmdb-back--zqfvjrr4byql.code.run/movie/${id}`,
          {
            cancelToken: signal.token,
          }
        );
        setDataId(response.data);
        console.log(response.data, "response initiale++++");

        //test changement titre page navigateur-----------
        document.title = `TMDB ▷ ${response.data.title}`;
        //------------------------------------------------

        setIsLoading(false);
      } catch (error) {
        console.log(error.message, "error message 🤒");
      }
    };

    fetchData();
    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const fetchDataSimilar = async () => {
      try {
        //à voir pour filtrer les films par pafge, date de sortie, notes...
        const response = await axios.get(
          `https://site--tmdb-back--zqfvjrr4byql.code.run/movie/${id}/similar`,
          {
            cancelToken: signal.token,
          }
        );
        setDataIdSimilar(response.data);
        // console.log(response.data, "response data similar-----------");
        setIsLoading1(false);
      } catch (error) {
        console.log(error.message, "error message 🤒");
      }
    };

    fetchDataSimilar();
    return () => {
      abortController.abort();
    };
  }, []);

  //troisième requete pour les images: voir pour implanter un carroussel d'images
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchDataImages = async () => {
      try {
        const response = await axios.get(
          `https://site--tmdb-back--zqfvjrr4byql.code.run/movie/${id}/images`,
          {
            cancelToken: signal.token,
          }
        );
        setDataImages(response.data);
        console.log(response.data, "response data images-----------");
        setIsLoading2(false);
      } catch (error) {
        console.log(error.message, "error message 🤒");
      }
    };

    fetchDataImages();
    return () => {
      abortController.abort();
    };
  }, []);

  //quatrième requete pour les perso: voir pour implanter un carroussel d'images
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchDataCast = async () => {
      try {
        const response = await axios.get(
          `https://site--tmdb-back--zqfvjrr4byql.code.run/movie/${id}/credits`,
          {
            cancelToken: signal.token,
          }
        );
        setDataCast(response.data);
        // console.log(response.data, "response data cast-----------");
        setIsLoading3(false);
      } catch (error) {
        console.log(error.message, "error message 🤒");
      }
    };

    fetchDataCast();
    return () => {
      abortController.abort();
    };
  }, []);

  //cinquième requete pour les perso: voir pour implanter un carroussel d'images
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchDataVideos = async () => {
      try {
        const response = await axios.get(
          `https://site--tmdb-back--zqfvjrr4byql.code.run/movie/${id}/videos`,
          {
            cancelToken: signal.token,
          }
        );
        setDataVideos(response.data);
        console.log(response.data, "response data videos-----------");
        // console.log(dataVideos.results[0].key, "key videos");
        setIsLoading4(false);
      } catch (error) {
        console.log(error.message, "error message 🤒");
      }
    };

    fetchDataVideos();
    return () => {
      abortController.abort();
    };
  }, []);

  return isLoading ? (
    <div className="mainContainerLoader">
      <Loader />
    </div>
  ) : (
    <div className="containerIdMovie">
      <div className="mainContainerIdMinColumn">
        <div className="test">
          <div className="firstColumn">
            <div className="h1andicon">
              <h1>{dataId.title}</h1>
              {!isLoading4 && (
                <div className="playButtonModal">
                  <ModalVideo
                    channel="youtube"
                    autoplay
                    isOpen={isOpen}
                    videoId={
                      dataVideos.results.length > 0
                        ? dataVideos.results[0].key
                        : ""
                    }
                    // videoId: key undefined donc condition avec longueur tableau resluts
                    onClose={() => setOpen(false)}
                  />
                  <button className="playButton" onClick={() => setOpen(true)}>
                    <FontAwesomeIcon icon="play" /> Bande-annonce
                  </button>
                </div>
              )}

              {/* bouton pour ajouter un favoris en BDD----------------- */}
              <div className="favAddButton">
                <button
                  className="favouritesButton"
                  onClick={async () => {
                    if (token) {
                      try {
                        const response = await axios.post(
                          "https://site--tmdb-back--zqfvjrr4byql.code.run/addfavourites",
                          {
                            name: dataId.original_title,
                            image: `${"https://image.tmdb.org/t/p/w500"}${
                              dataId.poster_path
                            }`,
                            token: token,
                          },
                          {
                            //ajout bearer token pour authentification avecmiddleware
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        );
                        // alert("added to favorites");
                        setVisible(true);
                        // la fonction seTimeout pour fermer la modal après 3 secondes
                        setTimeout(() => {
                          setVisible(false);
                        }, 2500);
                        console.log(response.data);
                      } catch (error) {
                        console.log(error.message);
                        if (
                          error.message ===
                          "Request failed with status code 409"
                        ) {
                          // alert("Already added to Favourites!");
                          setVisible2(true);
                          // la fonction seTimeout pour fermer la modal après 3 secondes
                          setTimeout(() => {
                            setVisible2(false);
                          }, 2500);
                        }
                      }
                    } else {
                      navigate("/user/login");
                    }
                  }}
                >
                  <FontAwesomeIcon icon="heart-circle-plus" />
                </button>
              </div>
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
                <span>Sociétés de production</span>
                {dataId.production_companies.map((even) => {
                  return <div key={uuid4()}>{even.name}</div>;
                })}
              </div>
              <div className="langage">
                <span>Langues:</span>
                {dataId.spoken_languages.map((even) => {
                  //ne mettre que le premier language d'origine--
                  return <div key={uuid4()}> {even.name}</div>;
                })}
              </div>
              <div className="langage">
                <span>Popularité:</span>
                <div>{dataId.popularity}</div>
              </div>
            </div>
          </div>

          <div className="movieIdImg">
            <img
              //   il faut concaténer l'adresse des images avec la taille
              //on peut mettre la taille originale ou w500 si cela rame trop
              // src={`${"https://image.tmdb.org/t/p/w500"}${
              src={`${"https://image.tmdb.org/t/p/original"}${
                dataId.poster_path
              }`}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="casth2">
        <h2>Distribution</h2>
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
                <Link to={`/cast/${even.id}`}>
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
                </Link>
              </div>
            );
          })}
        </div>
      )}
      {/* test casting------------------ */}
      <div className="globContainerVideoandPicture">
        <div className="carrouselContainer">
          {isLoading2 ? (
            <div></div>
          ) : (
            <div className="carousselImg">
              <div>
                <h2>Images du film</h2>
              </div>
              <Carousel useKeyboardArrows={true}>
                {dataImages.backdrops.map((URL, index) => (
                  <div className="slide" key={index}>
                    <img
                      alt="sample_file"
                      src={`${"https://image.tmdb.org/t/p/original"}${
                        URL.file_path
                      }`}
                      key={index}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          )}
        </div>

        {/* test react player---------------------------------- */}
        <div className="player">
          <div className="ltr">
            {!isLoading4 && (
              <h2 className="titleplayerElipsis">
                {dataVideos.results.length > 0 &&
                dataVideos.results[1] !== undefined
                  ? dataVideos.results[1].name
                  : "About movie"}
              </h2>
            )}
          </div>
          {isLoading4 ? (
            <div></div>
          ) : (
            <div className="reactplayer1">
              <ReactPlayer
                playing
                muted={false}
                loop={true}
                volume={1}
                light
                width="100%"
                //results[1] n'existe pas forcément, il faut donc une condtition pour que map ne soit pas undefined
                url={`https://www.youtube.com/watch?v=${
                  dataVideos.results.length > 0 &&
                  dataVideos.results[1] !== undefined
                    ? // && dataVideos.results[0] !== undefined
                      dataVideos.results[1].key
                    : dataVideos.results.length > 0 &&
                      dataVideos.results[1] === undefined
                    ? dataVideos.results[0].key
                    : ""
                }`}
              />
            </div>
          )}
        </div>
      </div>

      {/* ------------------------------ */}

      {/* il faut mettre un isloading sinon les données ne sont pas chargées et map undefined */}
      <div className="similarGlobContainer">
        {" "}
        {isLoading1 ? (
          <div>chargement</div>
        ) : (
          <div className="similarMovieContainer">
            <h1>Films similaires</h1>
            <div className="similarCarousel">
              <MoviesimilarCard data={dataIdSimilar} />
            </div>
          </div>
        )}
      </div>
      {/* partie modal pour confirmation-------------------------- */}
      <div>
        {visible && (
          <div className="mainModal">
            <div className="mainModalChoiceBox">
              <div>
                <p style={{ color: "black" }}>
                  Votre film a été ajouté à vos favoris!
                </p>
              </div>
            </div>
          </div>
        )}{" "}
      </div>
      {/* partie modal pour confirmation-------------------------- */}
      {/* partie modal pour confirmation-------------------------- */}
      <div>
        {visible2 && (
          <div className="mainModal">
            <div className="mainModalChoiceBox">
              <div>
                <p style={{ color: "red" }}>
                  Ce film a déjà été ajouté à vos favoris!
                </p>
              </div>
            </div>
          </div>
        )}{" "}
      </div>
      {/* partie modal pour confirmation-------------------------- */}
    </div>
  );
}
