import { React, useState, useEffect } from "react";

// import { Link } from "react-router-dom";
import axios from "axios";
import uuid4 from "uuid4";

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
    <div>chargement</div>
  ) : (
    <div className="containerUpMovie">
      <div className="mainContainerMinUpColumn">
        Upcoming movie: from {dataUp.dates.minimum} to {dataUp.dates.maximum}
        <div className="pagination">
          <input
            type="number"
            min="1"
            max="100"
            value={page}
            placeholder="page"
            onChange={(event) => setPage(event.target.value)}
          />
        </div>
        <div>
          <MovieCard data={dataUp} />
        </div>
      </div>
    </div>
  );
}
