import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const CardsContext = createContext();

export const useCardsContext = () => useContext(CardsContext);

export const CardsProvider = ({ children }) => {
  const [cards, cardsets] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cards")
      .then((response) => {
        cardsets(response.data);
        console.log("cards fetched:", response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the cards!", error);
      });
  }, []);

  return (
    <CardsContext.Provider value={cards}>{children}</CardsContext.Provider>
  );
};
