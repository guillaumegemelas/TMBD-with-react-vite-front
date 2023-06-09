import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

//import des pages
import Home from "./pages/Home/Home";
import Homefirst from "./pages/Homefirst/Homefirst";
import Header from "./components/Header/Header";
import MoviebyIdDetails from "./pages/MoviebyIdDetails/MoviebyIdDetails";
import UpcomingMovie from "./pages/Upcoming/UpcomingMovie";
import Moviesasc from "./pages/Movieasc/Moviesasc";
import Moviesdesc from "./pages/Moviedesc/Moviesdesc";
import CastByIdDetails from "./pages/CastByIdDetails/CastByIdDetails";
import Popular from "./pages/Popular/Popular";
import Search from "./pages/Search/Search";
import Profil from "./pages/Profil/Profil";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Footer from "./components/Footer/Footer";

//import des font d'icones vectorielles
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHouse,
  faArrowUpWideShort,
  faArrowDownShortWide,
  faFile,
  faMessage,
  faInbox,
  faUser,
  faHeartCirclePlus,
  faTrashCan,
  faPlay,
  faUserPlus,
  faRightToBracket,
  faRightFromBracket,
  faClapperboard,
  faUserAstronaut,
  faUserSlash,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faHouse,
  faArrowUpWideShort,
  faArrowDownShortWide,
  faFile,
  faMessage,
  faInbox,
  faUser,
  faHeartCirclePlus,
  faTrashCan,
  faPlay,
  faUserPlus,
  faRightToBracket,
  faRightFromBracket,
  faClapperboard,
  faUserAstronaut,
  faUserSlash
);

//import du CSS
import "./App.css";
import Favourites from "./pages/Favourites/Favourites";

function App() {
  //génération du token et on le garde dans les cookies
  const [token, setToken] = useState(Cookies.get("token") || null);
  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: 10 });
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  return (
    <div>
      <Router>
        {/* le header apparaitra sur toutes les pages */}
        {/* {window.location.pathname !== "/" && (
          <Header token={token} handleToken={handleToken} />
        )} */}
        <Header token={token} handleToken={handleToken} />
        <Routes>
          <Route path="/" element={<Homefirst />} />
          <Route path="/home" element={<Home />} />
          {/* route avec params id--- */}
          <Route
            path="/movie/:id"
            element={<MoviebyIdDetails token={token} />}
          />
          <Route path="/movie/upcoming" element={<UpcomingMovie />} />
          <Route path="/search" element={<Search />} />
          <Route path="/person/popular" element={<Popular />} />
          <Route path="/averageasc" element={<Moviesasc />} />
          <Route path="/averagedesc" element={<Moviesdesc />} />
          <Route
            path="/user/login"
            element={<Login handleToken={handleToken} />}
          />
          <Route
            path="/user/signup"
            element={<Signup handleToken={handleToken} />}
          />
          <Route
            path="/user/:id"
            element={<Profil handleToken={handleToken} token={token} />}
          />
          {/* Route plus nécessaire car on récupère les user avec l'Id du user et non pas avec le Token */}
          {/* <Route path="/favourites" element={<Favourites token={token} />} /> */}
          {/* Route test favorites avec userId ------------------------------------*/}
          <Route
            path="/favourites/:id"
            element={<Favourites token={token} />}
          />
          {/* Route test favorites avec userId ------------------------------------*/}
          <Route path="/cast/:id" element={<CastByIdDetails />} />
        </Routes>
        {/* {window.location.pathname !== "/" && <Footer />} */}
        <Footer />
      </Router>
    </div>
  );
}

export default App;
