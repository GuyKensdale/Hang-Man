import React, { useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useRef } from "react";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

function getOrdinal(number) {
  const suffixes = ["th.", "st.", "nd.", "rd."];
  const index = number % 100;
  return (
    number + (suffixes[(index - 20) % 10] || suffixes[index] || suffixes[0])
  );
}

function HighScores() {
  const [scores, setScores] = useState([]);
  const scroll = useRef(null);
  const navigate = useNavigate();
  const [numScores, setNumScores] = useState(10); // Default value: 10

  useEffect(() => {
    const q = query(collection(db, "LeaderBoards"), orderBy("score", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const scores = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setScores(scores);
    });
    return () => unsubscribe();
  }, []);

  const handlePlayAgain = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleNumScoresChange = (event) => {
    setNumScores(parseInt(event.target.value, 10));
  };

  return (
    <>
      <div className="body">
        <h1>HighScores</h1>
        <h6>
          Show top
          <select
            value={numScores}
            onChange={handleNumScoresChange}
            className="drop-53"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={100000000}>All</option>
          </select>{" "}
          high scores
        </h6>
        <h3></h3>
        <main>
          {scores.slice(0, numScores).map((score, index) => (
            <div key={score.id}>
              {getOrdinal(index + 1)} {score.name}: {score.score}
            </div>
          ))}
          <span ref={scroll}></span>
        </main>

        <button className="button-53" onClick={handlePlayAgain}>
          Play Again
        </button>
      </div>
    </>
  );
}

export default HighScores;
