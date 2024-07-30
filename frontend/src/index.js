// frontend/src/index.js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CardsOfSet from "./pages/cardOfSetPage/CardsOfSetPage";
import { CardsProvider } from "./components/context/cardsProvider";
import CardDetails from "./pages/CardDetailsPage/CardDetails";
import { UserProvider } from "./components/context/userContext";
import TopDecks from "./pages/TopDecksPage/TopDecks";
import CardsOfDeck from "./pages/CardsOfDeckPage/CardsOfDeck";
import CreateDeck from "./pages/CreateDeckPage/CreateDeck";
import ShoppingCart from "./pages/ShoppingCartPage/ShoppingCart";
import Forum from "./pages/ForumPage/Forum";
import Article from "./pages/ArticlePage/Article";
import OrderPage from "./pages/OrderPage/OrderPage";
import UserInfoPage from "./pages/UserInfoPage/UserInfoPage";

const router = createBrowserRouter([
  {
    path: "/orders",
    element: <OrderPage />,
  },
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
  {
    path: "/shopping-cart",
    element: <ShoppingCart />,
  },
  {
    path: "/forum",
    element: <Forum />,
  },
  {
    path: "/article/:id",
    element: <Article />,
  },
  {
    path: "/user-details",
    element: <UserInfoPage />,
  },
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
