import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [cards, setCards] = useState([]);
  const [sets, setSets] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/cards')
      .then(response => {
        setCards(response.data);
        console.log('Cards fetched:', response.data); // Debugging
      })
      .catch(error => {
        console.error('There was an error fetching the cards!', error);
      });
  }, []);

  const removeDuplicates = (array, key) => {
    return array.filter((item, index, self) =>
      index === self.findIndex(obj => obj[key] === item[key])
    );
  };

  const filterSetsWithCards = useCallback((setsData) => {
    if (cards.length === 0) {
      return [];
    }

    // Collect unique set names from card_sets
    const cardSetNames = cards.reduce((setNames, card) => {
      if (card.card_sets) {
        card.card_sets.forEach(set => {
          if (!setNames.includes(set.set_name)) {
            setNames.push(set.set_name);
          }
        });
      }
      return setNames;
    }, []);

    // Filter sets based on whether they appear in cardSetNames
    return setsData.filter(set => cardSetNames.includes(set.set_name));
  }, [cards]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/sets')
      .then(response => {
        const setsWithImages = response.data.filter(set => set.set_image);
        const uniqueSets = removeDuplicates(setsWithImages, 'set_code')
        console.log('unique Sets:', uniqueSets.length); // Debugging
        ;
        const validSets = filterSetsWithCards(uniqueSets);
        setSets(validSets);
        console.log('Valid Sets:', validSets.length); // Debugging
      })
      .catch(error => {
        console.error('There was an error fetching the sets!', error);
      });
  }, [filterSetsWithCards]);

  return (
    <div className="container">
      <h1>Card Castle Yu-Gi-Oh!</h1>
      <div className="grid-container">
        {sets.map((set, index) => (
          <div key={index} className="grid-item">
            <img src={set.set_image} alt={set.set_name} style={{ width: '50px', height: '100px' }} />
            <div>{set.set_name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
