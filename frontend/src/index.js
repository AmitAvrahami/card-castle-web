// frontend/src/index.js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CardsOfSet from "./pages/CardsOfSetPage";
import { CardsProvider } from "./components/context/cardsProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/cards-of-set/:setID/:setName",
    element: <CardsOfSet />,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <CardsProvider>
      <RouterProvider router={router} />
    </CardsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
