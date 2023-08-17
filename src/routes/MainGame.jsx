import React, { useEffect, useState } from "react";
import wordList from "../assets/Words";
import alphabet from "../assets/alpha";
import ImageGen from "./imageGen";

import { useLocation } from "react-router-dom";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

import { addDoc, collection } from "firebase/firestore";
function MainGame() {
  const [clickedLetters, setClickedLetters] = useState([]);
  const [randomWordState, setRandomWordState] = useState([]);
  const [correctGuess, setCorrectGuess] = useState([]);
  const [points, setPoints] = useState(0);
  const [uniqueLetter, setUniqueLetter] = useState([]);
  const [fail, setFail] = useState("");
  const location = useLocation();
  const { username } = location.state || {}; // Access the username from the state
  const navigate = useNavigate();
  function removeDuplicates(word) {
    const uniqueChars = [];

    word.forEach((letter) => {
      if (!uniqueChars.includes(letter)) {
        uniqueChars.push(letter);
      }
    });

    return uniqueChars.join("");
  }

  function getRandomWord() {
    const limit = wordList.length;
    const randomNum = Math.floor(Math.random() * limit);
    return wordList[randomNum];
  }

  useEffect(() => {
    generateNewWord();
  }, []);

  useEffect(() => {
    const letterList = removeDuplicates(randomWordState);
    setUniqueLetter(letterList);
    const newCorrectGuesses = clickedLetters.filter((letter) =>
      randomWordState.includes(letter.toLowerCase())
    );

    setCorrectGuess(newCorrectGuesses);

    // Determine the maximum number of incorrect attempts allowed
    const maxIncorrectAttempts = 6;

    if (
      clickedLetters.length - newCorrectGuesses.length ===
      maxIncorrectAttempts
    ) {
      console.log("fail");
      setFail("Game Over!");
    }
  }, [clickedLetters, randomWordState]);
  useEffect(() => {
    if (correctGuess.length === uniqueLetter.length) {
      const wordLength = randomWordState.length;
      const wordPoints = wordLength * 10;

      setPoints((prevPoints) => prevPoints + wordPoints);
    }
  }, [correctGuess.length, uniqueLetter.length]);
  function handleLetterClick(letter) {
    const lowercaseLetter = letter.toLowerCase();

    setClickedLetters((prevClickedLetters) => [
      ...prevClickedLetters,
      lowercaseLetter,
    ]);
  }

  function getDisplayCorrectGuesses() {
    return randomWordState
      .map((letter) =>
        correctGuess.includes(letter.toLowerCase()) ? letter : "_"
      )
      .join(" ");
  }
  const highScoreClick = async () => {
    await addDoc(collection(db, "LeaderBoards"), {
      name: username,
      score: points,
    });
    let path = `/HighScores`;
    navigate(path);
  };
  function generateNewWord() {
    const newRandomWord = getRandomWord().toLowerCase().split("");
    setRandomWordState(newRandomWord);
    setClickedLetters([]);
    setCorrectGuess([]);
  }

  return (
    <>
      <div className="body">
        <h1>Hangman</h1>
        {username && <p>Welcome, {username}!</p>}
        <div className="buttons-container">
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => handleLetterClick(letter)}
              style={{
                textDecoration: clickedLetters.includes(letter.toLowerCase())
                  ? "line-through"
                  : "none",
              }}
              disabled={clickedLetters.includes(letter.toLowerCase())}
            >
              {letter}
            </button>
          ))}
          <h2>{getDisplayCorrectGuesses()}</h2>
        </div>

        <h2>{fail}</h2>

        <div>
          <h3>Points: {points}</h3>
        </div>
        <div>
          {fail.length > 0 ? (
            <button onClick={highScoreClick}>High Scores</button>
          ) : null}
        </div>
        {correctGuess.length === uniqueLetter.length && (
          <button onClick={generateNewWord}>Next Word</button>
        )}

        <div className="hangman-images">
          <ImageGen
            incorrectGuesses={clickedLetters.length - correctGuess.length}
          />
        </div>
      </div>
    </>
  );
}

export default MainGame;
