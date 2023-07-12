import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// import du package pour la modale
import "react-modal-video/scss/modal-video.scss";

//import pour react-query
import { QueryClient, QueryClientProvider } from "react-query";

//pour react query
const queryClient = new QueryClient();

//import du package bootstrap
// import "bootstrap/dist/css/bootstrap.min.css";
//si on ne veut pas de bootstrap, il faut commenter la ligne

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
