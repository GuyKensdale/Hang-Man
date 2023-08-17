import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { db } from "../../firebase";

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

  return (
    <>
      <div className="body">
        <h1>HighScores</h1>
        <main>
          {scores.map((score, index) => (
            <div key={score.id}>
              {getOrdinal(index + 1)} {score.name}: {score.score}
            </div>
          ))}
          <span ref={scroll}></span>
        </main>
      </div>
    </>
  );
}

export default HighScores;
