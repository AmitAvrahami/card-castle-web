import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./App.css";
import Pagination from "./components/Pagination";
import SetItem from "./components/SetItem/SetItem";
import titleImage from './images/card-castle-yu-gi-oh-font-title.png';

const App = () => {
  const [sets, setSets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const setsPerPage = 15;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/sets")
      .then((response) => {
        setSets(response.data);
        console.log("Sets fetched:", response.data); // Debugging
      })
      .catch((error) => {
        console.error("There was an error fetching the sets!", error);
      });
  }, []);

  const indexOfLastSet = currentPage * setsPerPage;
  const indexOfFirstSet = indexOfLastSet - setsPerPage;
  const currentSets = sets.slice(indexOfFirstSet, indexOfLastSet);

  return (
    <div className="origin-container">
      <img src={titleImage} alt="Card Castle Yu-Gi-Oh!" className="heading-image" />

      <div className="container">


        <div className="grid-container">
          {currentSets.map((set, index) => (
            <SetItem key={index} set={set}></SetItem>
          ))}
        </div>
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
