import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//import style.css
import "../CastByIdDetails/style.css";

// import image from "../../img/movieimg.jpg";

// import { Link } from "react-router-dom";
import axios from "axios";
import uuid4 from "uuid4";
//pour récupérer l'Id venant de Home
import { useParams } from "react-router-dom";

export default function CastByIdDetails() {
  const [dataCastId, setDataCastId] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        console.log(response.data, "response initiale++++");
        setIsLoading(false);
      } catch (error) {
        console.log(error.message, "error message 🤒");
      }
    };

    fetchDataCastId();
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
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2>
          Ici se trouvera les films associés au personnage: requete en get à
          faire au backet afficher les jaquettes sur la meme principe que page
          movie get id
        </h2>
      </div>
    </div>
  );
}
