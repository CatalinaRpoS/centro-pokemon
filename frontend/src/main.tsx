import React from "react";
import ReactDOM from "react-dom/client";
import { AppRouterProvider } from "./contexts/AppRouterProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppRouterProvider />
  </React.StrictMode>
);
