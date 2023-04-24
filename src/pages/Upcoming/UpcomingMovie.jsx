import { React, useState, useEffect } from "react";

// import { Link } from "react-router-dom";
import axios from "axios";
import uuid4 from "uuid4";

//import icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import des composants
import MovieCard from "../../components/MovieCard/MovieCard";

//import style.css
import "../Upcoming/style.css";

export default function UpcomingMovie() {
  const [dataUp, setDataUp] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //le système de pagination
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //à voir pour filtrer les films par pafge, date de sortie, notes...
        const response = await axios.get(
          `http://localhost:3000/upcoming?page=${page}`
        );
        setDataUp(response.data);
        console.log(response.data, "response initiale upcoming++++");
        setIsLoading(false);
      } catch (error) {
        console.log(error.message, "error message 🤒");
      }
    };

    fetchData();
  }, [page]);

  return isLoading ? (
    <div className="containerUpMovie"></div>
  ) : (
    <div className="containerUpMovie">
      <div className="mainContainerMinUpColumn">
        <h2>
          {" "}
          Upcoming movie:{" "}
          <span className="span">
            from <span className="span">{dataUp.dates.minimum}</span> to{" "}
            <span className="span">{dataUp.dates.maximum}</span>
          </span>
        </h2>

        <div>
          <MovieCard data={dataUp} />
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
