// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [cards, setCards] = useState([]);
  const [sets, setSets] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:5000/api/cards')
      .then(response => {
        setCards(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the cards!', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/api/sets')
      .then(response => {
        setSets(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the sets!', error);
      });
  }, []);

  return (
    <div>
      <h1>Yu-Gi-Oh! Cards</h1>
      <ul>
        {cards.map(card => (
          <li key={card.id} style={{ marginBottom: '20px' }}>
            <h2>{card.name}</h2>
            {card.card_images && card.card_images.length > 0 && (
              <img src={card.card_images[0].image_url} alt={card.name} style={{ width: '200px', height: '300px' }} />
            )}
            {card.card_sets && card.card_sets.length > 0 && (
              <div>
                <h3>Set Names:</h3>
                <ul>
                  {card.card_sets.map((set, index) => (
                    <li key={index}>{set.set_name}</li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
