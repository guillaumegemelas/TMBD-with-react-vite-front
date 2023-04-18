import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

//import des pages
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import MoviebyIdDetails from "./pages/MoviebyIdDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

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
          <Route
            path="/user/login"
            element={<Login handleToken={handleToken} />}
          />
          <Route
            path="/user/signup"
            element={<Signup handleToken={handleToken} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
