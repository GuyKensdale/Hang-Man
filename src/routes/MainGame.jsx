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
  const [letterButtonsDisabled, setLetterButtonsDisabled] = useState(false); // New state for letter button disabling
  const location = useLocation();
  const { username } = location.state || {};
  const navigate = useNavigate();
  const [highScoreButtonClicked, setHighScoreButtonClicked] = useState(false);

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
    const maxIncorrectAttempts = 9;

    if (
      clickedLetters.length - newCorrectGuesses.length ===
      maxIncorrectAttempts
    ) {
      console.log("fail");
      setFail("Game Over!");
      setLetterButtonsDisabled(true); // Disable letter buttons on game over
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
    if (!highScoreButtonClicked) {
      setHighScoreButtonClicked(true);
      await addDoc(collection(db, "LeaderBoards"), {
        name: username,
        score: points,
      });
      let path = `/HighScores`;
      navigate(path);
    }
  };

  function generateNewWord() {
    const newRandomWord = getRandomWord().toLowerCase().split("");
    setRandomWordState(newRandomWord);
    setClickedLetters([]);
    setCorrectGuess([]);
    setLetterButtonsDisabled(false); // Enable letter buttons when generating a new word
  }

  return (
    <>
      <div className="body">
        <h1>Hangman</h1>
        {username && <p>Welcome, {username}!</p>}
        <div className="buttons-container">
          {alphabet.map((letter) => (
            <button
              className="button-53"
              key={letter}
              onClick={() => handleLetterClick(letter)}
              style={{
                textDecoration: clickedLetters.includes(letter.toLowerCase())
                  ? "line-through"
                  : "none",
              }}
              disabled={
                letterButtonsDisabled ||
                clickedLetters.includes(letter.toLowerCase())
              }
            >
              {letter}
            </button>
          ))}
          <h2>{getDisplayCorrectGuesses()}</h2>
        </div>

        <h2>{fail}</h2>
        <div>
          {letterButtonsDisabled === true && (
            <h3>the word was {randomWordState}</h3>
          )}
        </div>

        <div>
          <h3>Points: {points}</h3>
        </div>
        <div>
          {fail.length > 0 && (
            <button
              className="button-53"
              onClick={highScoreClick}
              disabled={highScoreButtonClicked}
            >
              High Scores
            </button>
          )}
        </div>

        {correctGuess.length === uniqueLetter.length && (
          <button className="button-53" onClick={generateNewWord}>
            Next Word
          </button>
        )}
        <h1></h1>
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
