import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

//import style.css
import "../Popular/style.css";

//import de l'image pour afficher si url === null
import image from "../../img/movieimg.jpg";

//import icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import du Loader
import Loader from "../../components/Loader/Loader";

// import { Link } from "react-router-dom";
import axios from "axios";
import uuid4 from "uuid4";

export default function Popular() {
  //test requete vers API TMDB
  const [dataPop, setDataPop] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  //useEffect pour se positionner en haut de la page en venant de charachter page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //test changement titre page navigateur
  useEffect(() => {
    document.title = `TMDB Popular`;
  }, []);

  const fetchData = async () => {
    try {
      fetch(
        `https://site--tmdb-back--zqfvjrr4byql.code.run/person/popular?page=${page}`
      )
        .then((response) => response.json())
        .then((data) => {
          setDataPop(data);
          setIsLoading(false);
          console.log(data);
        });
    } catch (error) {
      console.log(error.message, "error message 🤒");
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return isLoading ? (
    <div className="mainContainerLoader">
      <Loader />
    </div>
  ) : (
    <div className="mainContainer">
      <div className="mainContainerMinColumn">
        <h2> Popular on TMDB</h2>
        <div className="secondContainer">
          {dataPop.results.map((even) => {
            return (
              <div key={uuid4()} className="movieCard12">
                <Link to={`/cast/${even.id}`}>
                  <div className="movieCardImg12">
                    {" "}
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
                  </div>
                  <div className="movieCardDesc1">
                    <div className="movieTitle1">
                      <h1>{even.name}</h1>
                    </div>
                    <div className="movieP1">
                      {even.popularity >= 7.5 && (
                        <p className="vote">
                          {Number(even.popularity).toFixed(0)} <span>%</span>{" "}
                        </p>
                      )}
                      {even.popularity < 7.5 && even.popularity >= 5 && (
                        <p className="vote1">
                          {Number(even.popularity).toFixed(0)} <span>%</span>{" "}
                        </p>
                      )}
                      {even.popularity < 5 && even.popularity >= 2.5 && (
                        <p className="vote2">
                          {Number(even.popularity).toFixed(0)} <span>%</span>{" "}
                        </p>
                      )}
                      {even.popularity < 2.5 && even.popularity > 0 && (
                        <p className="vote3">
                          {Number(even.popularity).toFixed(0)} <span>%</span>{" "}
                        </p>
                      )}
                      {even.popularity <= 0 && <p className="vote4">NR</p>}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
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
