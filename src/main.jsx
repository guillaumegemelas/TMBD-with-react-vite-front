import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

//import du package bootstrap
// import "bootstrap/dist/css/bootstrap.min.css";
//si on ne veut pas de bootstrap, il faut commenter la ligne

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
