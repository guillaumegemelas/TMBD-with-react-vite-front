import React from "react";
import image from "../../img/movieimg.jpg";

import uuid4 from "uuid4";

//import style.css
import "../MoviesimilarCard/style.css";

export default function MoviesimilarCard({ data }) {
  return (
    <div className="secondContainer1">
      {data.results.map((even) => {
        return (
          <div className="movieCard1" key={uuid4()}>
            <div className="movieCardImg1">
              {/* pour éviter d'avoir des erreurs en cas de image = null */}
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
          </div>
        );
      })}
    </div>
  );
}
