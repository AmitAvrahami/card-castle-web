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
import TopDecks from "./pages/TopDecks/TopDecks";
import CardsOfDeck from "./pages/CardsOfDeckPage/CardsOfDeck";
import CreateDeck from "./pages/CreateDeck/CreateDeck";


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
  {
    path: "/top-decks",
    element: <TopDecks />,
  },
  {
    path: "/deck-details/:deckId",
    element: <CardsOfDeck />,
  },
  {
    path: "/create-deck",
    element: <CreateDeck />,
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
