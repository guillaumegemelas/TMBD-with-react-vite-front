import React from "react";

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
                <img
                  //   il faut concaténer l'adresse des images avec la taille
                  src={`${"https://image.tmdb.org/t/p/w500"}${
                    even.poster_path
                  }`}
                  alt="imgmovie"
                />
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
