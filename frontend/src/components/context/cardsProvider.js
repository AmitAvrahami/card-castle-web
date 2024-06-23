import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Create the context
const CardsContext = createContext();

// Custom hook to use the context
export const useCardsContext = () => useContext(CardsContext);

// CardsProvider component
export const CardsProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [cardSets, setCardSets] = useState([]);
  const [selectedSet, setSelectedSet] = useState(() => {
    // Try to get the selected set from local storage on initial load
    const savedSet = localStorage.getItem('selectedSet');
    return savedSet ? JSON.parse(savedSet) : null;
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/cards")
      .then((response) => {
        setCards(response.data);
        setCardSets(response.data.cardSets); // Assuming response.data has cardSets
        console.log("Cards and sets fetched:", response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the cards and sets!", error);
      });
  }, []);

  useEffect(() => {
    // Save the selected set to local storage whenever it changes
    if (selectedSet) {
      localStorage.setItem('selectedSet', JSON.stringify(selectedSet));
    }
  }, [selectedSet]);

  const contextValue = {
    cards,
    cardSets,
    selectedSet,
    setSelectedSet,
  };

  return (
    <CardsContext.Provider value={contextValue}>
      {children}
    </CardsContext.Provider>
  );
};