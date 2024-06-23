import { Link, useParams } from "react-router-dom";
import { useCardsContext } from "../components/context/cardsProvider";
import { useState, useEffect } from "react";

function CardsOfSet() {
  const { setID, setName } = useParams();
  const { cards, selectedSet } = useCardsContext(); // This will be the array of cards
  const [filteredCards, setFilteredCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cards && cards.length > 0) {
      const filtered = cards.filter((card) => {
        return (
          card.card_sets &&
          card.card_sets.some((set) => {
            const setCodePrefix = set.set_code.split("-")[0];
            return setCodePrefix === setID && set.set_name === setName;
          })
        );
      });
      setFilteredCards(filtered);
      setLoading(false); // Data processing is complete, set loading to false
    }
  }, [setID, setName, cards]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (filteredCards.length === 0) {
    return <h1>No cards found for this set.</h1>;
  }

  console.log("selected set", selectedSet);
  return (
    <div>
      <h1>Cards of Set {`${setName}(${setID})`}</h1>
      <h2>selected set: {selectedSet ? `${selectedSet.set_name}` : "Not available"}</h2>
      <div className="card-list">
        {filteredCards.map((card) => (
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
