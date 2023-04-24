import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

//import des pages
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import MoviebyIdDetails from "./pages/MoviebyIdDetails/MoviebyIdDetails";
import UpcomingMovie from "./pages/Upcoming/UpcomingMovie";
import Moviesasc from "./pages/Movieasc/Moviesasc";
import Moviesdesc from "./pages/Moviedesc/Moviesdesc";
import Search from "./pages/Search/Search";
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
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faHouse,
  faArrowUpWideShort,
  faArrowDownShortWide,
  faFile,
  faMessage,
  faInbox,
  faUser
);

//import du CSS
import "./App.css";

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
        {/* le hader apparaitra sur toutes les pages */}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* route avec params id--- */}
          <Route path="/movie/:id" element={<MoviebyIdDetails />} />
          <Route path="/movie/upcoming" element={<UpcomingMovie />} />
          <Route path="/search" element={<Search />} />
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
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
