import { Link, useParams } from "react-router-dom";
import { useCardsContext } from "../components/context/cardsProvider";
import { useState, useEffect } from "react";

function CardsOfSet() {
  const { setID, setName } = useParams();
  const allCards = useCardsContext(); // This will be the array of cards
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const filteredCards = allCards.filter((card) => {
      return (
        card.card_sets &&
        card.card_sets.some((set) => {
          const setCodePrefix = set.set_code.split("-")[0];
          return setCodePrefix === setID && set.set_name === setName;
        })
      );
    });

    setCards(filteredCards);
  }, [setID, allCards]);

  if (cards.length === 0) {
    return <h1>No cards found for this set.</h1>;
  }

  return (
    <div>
      <h1>Cards of Set {setName}</h1>
      <div className="card-list">
        {cards.map((card) => (
          <div key={card.id} className="card-item">
            <Link to={`/card/${card.id}`}>
              <img src={card.card_images[0].image_url_small} alt={card.name} />
              <h2>{card.name}</h2>
            </Link>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardsOfSet;
