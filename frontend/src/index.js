// frontend/src/index.js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CardsOfSet from "./pages/cardOfSetPage/CardsOfSetPage";
import { CardsProvider } from "./components/context/cardsProvider";
import CardDetails from "./pages/CardDetails/CardDetails";
import { UserProvider } from "./components/context/userContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/cards-of-set/:setID/:setName",
    element: <CardsOfSet />,
  },
  {
    path: "/card/:cardId",
    element: <CardDetails />,
  },
  {},
]);

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <CardsProvider>
        <RouterProvider router={router} />
      </CardsProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
