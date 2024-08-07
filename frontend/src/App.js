import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Pagination from "./components/pagination/Pagination";
import SetItem from "./components/SetItem/SetItem";
import titleImage from "./images/card-castle-yu-gi-oh-font-title.png";
import NavScrollBar from "./components/NavScrollBar/NavScrollBar";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [sets, setSets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const setsPerPage = 15;

  useEffect(() => {
    axios
      .get("https://card-castle.onrender.com/api/sets")
      .then((response) => {
        setSets(response.data);
        console.log("Sets fetched:", response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the sets!", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const indexOfLastSet = currentPage * setsPerPage;
  const indexOfFirstSet = indexOfLastSet - setsPerPage;
  const currentSets = sets.slice(indexOfFirstSet, indexOfLastSet);

  return (
    <div className="origin-container">
      {loading ? (
        <div className="spinner-container">
          <Spinner animation="border" role="status">
            <span className="sr-only">.</span>
          </Spinner>
        </div>
      ) : (
        <>
          <NavScrollBar />
          <img
            src={titleImage}
            alt="Card Castle Yu-Gi-Oh!"
            className="heading-image"
          />
          <div className="container">
            <div className="grid-container">
              {currentSets.map((set, index) => (
                <SetItem key={index} set={set} />
              ))}
            </div>
          </div>
          <Pagination
            totalSets={sets.length}
            setsPerPage={setsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default App;
