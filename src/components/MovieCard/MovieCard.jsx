import React from "react";
import image from "../../img/movieimg.jpg";

import { Link } from "react-router-dom";
import uuid4 from "uuid4";

//import style.css
import "../MovieCard/style.css";

export default function MovieCard({ data }) {
  return (
    <div className="secondContainer">
      {data.results.map((even) => {
        return (
          <div className="movieCard" key={uuid4()}>
            <Link to={`/movie/${even.id}`}>
              <div className="movieCardImg">
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
              <div className="movieTitle">
                <h1>{even.original_title}</h1>
              </div>
              <div className="movieP">
                <p>{even.release_date}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
