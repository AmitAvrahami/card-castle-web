import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import Pagination from './components/Pagination';

const App = () => {
  const [cards, setCards] = useState([]);
  const [sets, setSets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const setsPerPage = 15

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


  useEffect(() => {
    axios.get('http://localhost:5000/api/sets')
      .then(response => {
        setSets(response.data);
        console.log('Sets fetched:', response.data); // Debugging
      })
      .catch(error => {
        console.error('There was an error fetching the sets!', error);
      });
  }, []);



  const indexOfLastSet = currentPage * setsPerPage
  const indexOfFirstSet = indexOfLastSet - setsPerPage
  const currentSets = sets.slice(indexOfFirstSet, indexOfLastSet)

  return (
    <div className="container">
      <h1 className="heading">Card Castle Yu-Gi-Oh!</h1>
      <div className="grid-container">
        {currentSets.map((set, index) => (
          <div key={index} className="grid-item">
            <img src={set.set_image} alt={set.set_name} style={{ width: '50px', height: '100px' }} />
            <div>{set.set_name}</div>
          </div>
        ))}
      </div>
      <Pagination
        totalSets={sets.length}
        setsPerPage={setsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default App;
