import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Pagination from "./components/pagination/Pagination";
import SetItem from "./components/SetItem/SetItem";
import titleImage from "./images/card-castle-yu-gi-oh-font-title.png";
import NavScrollBar from "./NavScrollBar/NavScrollBar";
import { useUserContext } from "./components/context/userContext";

const App = () => {
  const [sets, setSets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const setsPerPage = 15;
  const { setUser } = useUserContext();

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/validate", { withCredentials: true });
        if (response.data.status === "Success") {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Error validating token:", error);
      }
    };

    validateToken();
  }, [setUser]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/sets")
      .then((response) => {
        setSets(response.data);
        console.log("Sets fetched:", response.data);
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
    </div>
  );
};

export default App;
