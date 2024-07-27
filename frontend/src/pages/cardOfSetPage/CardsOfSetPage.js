import React from "react";
import { Link, useParams } from "react-router-dom";
import { useCardsContext } from "../../components/context/cardsProvider";
import { useState, useEffect } from "react";
import "./CardsOfSetPage.css"; // Ensure you import the CSS file
import NavScrollBar from "../../components/NavScrollBar/NavScrollBar";

function CardsOfSet() {
  const { setID, setName } = useParams();
  const { cards, selectedSet } = useCardsContext();
  const [filteredCards, setFilteredCards] = useState([]);

  useEffect(() => {
    if (selectedSet) {
      const filteredCards = cards.filter((card) => {
        return (
          card.card_sets &&
          card.card_sets.some((set) => {
            const setCodePrefix = set.set_code.split("-")[0];
            return setCodePrefix === setID && set.set_name === setName;
          })
        );
      });
      setFilteredCards(filteredCards);
    }
  }, [setID, setName, cards, selectedSet]);

  if (filteredCards.length === 0) {
    return <h1>No cards found for this set.</h1>;
  }

  return (
    <div>
      <NavScrollBar></NavScrollBar>
      <h1>Cards of Set {`${setName}(${setID})`}</h1>
      <h2>
        selected set:{" "}
        {selectedSet ? `${selectedSet.set_name}` : "Not available"}
      </h2>
      <div className="page-container">
        <h1 className="main-title">Cards of Set {`${setName}(${setID})`}</h1>
        <h2 className="sub-title">
          <ul>
            <li>{selectedSet.set_name} cards</li>
            <li>{selectedSet.set_code} cards</li>
            <li>Released {selectedSet.tcg_date}</li>
          </ul>
        </h2>
        <div className="card-list">
          {filteredCards.map((card) => (
            <div key={card.id} className="card-item">
              <Link to={`/card/${card.id}`}>
                <img
                  src={card.card_images[0].image_url_small}
                  alt={card.name}
                />
                <h2>{card.name}</h2>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardsOfSet;
