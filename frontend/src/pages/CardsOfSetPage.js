import { Link, useParams } from "react-router-dom";
import { useCardsContext } from "../components/context/cardsProvider";
import { useState, useEffect } from "react";

function CardsOfSet() {
  const { setID } = useParams();
  const allCards = useCardsContext();
  const [cards, setCards] = useState();
  console.log(setID);

  useEffect(() => {
    const filteredCards = allCards.filter((card) => {
      if (card.card_sets && card.card_sets.length > 0) {
        const hasSetId = card.card_sets.filter((set) => set.set_code === setID);
        return hasSetId.length > 0;
        N;
      }
      return false; // Return false if card.card_sets does not exist or is empty
    });

    setCards(filteredCards);
  }, [setID, allCards]);

  console.log(cards);

  return <h1>Cards OF SET</h1>;
}

export default CardsOfSet;
