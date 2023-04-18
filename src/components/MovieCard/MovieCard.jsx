import React from "react";

import { Link } from "react-router-dom";
import uuid4 from "uuid4";

//import style.css
import "../Header/style.css";

export default function MovieCard({ data }) {
  return (
    <div className="secondContainer">
      {data.results.map((even) => {
        return (
          <div className="movieCard" key={uuid4()}>
            <div className="">
              <Link to={`/movie/${even.id}`}>
                <img
                  //   il faut concaténer l'adresse des images avec la taille
                  src={`${"https://image.tmdb.org/t/p/w500"}${
                    even.poster_path
                  }`}
                  alt=""
                />
                <div className="movieTitle">
                  <h1>{even.original_title}</h1>
                </div>
                <div>
                  <p>{even.release_date}</p>
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
