import React from "react";

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
              <img
                //   il faut concaténer l'adresse des images avec la taille
                src={`${"https://image.tmdb.org/t/p/w500"}${even.poster_path}`}
                alt=""
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
