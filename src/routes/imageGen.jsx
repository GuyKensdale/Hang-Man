import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import image0 from "/home/guy/personal/Hang-Man2.0/src/hangmanimages/image0.png";
import image1 from "/home/guy/personal/Hang-Man2.0/src/hangmanimages/image1.png";
import image2 from "/home/guy/personal/Hang-Man2.0/src/hangmanimages/image2.png";
import image3 from "/home/guy/personal/Hang-Man2.0/src/hangmanimages/image3.png";
import image4 from "/home/guy/personal/Hang-Man2.0/src/hangmanimages/image4.png";
import image5 from "/home/guy/personal/Hang-Man2.0/src/hangmanimages/image5.png";
import image6 from "/home/guy/personal/Hang-Man2.0/src/hangmanimages/image6.png";
import image7 from "/home/guy/personal/Hang-Man2.0/src/hangmanimages/image7.png";
import image8 from "/home/guy/personal/Hang-Man2.0/src/hangmanimages/image8.png";

function ImageGen({ incorrectGuesses }) {
  // Map incorrectGuesses to the appropriate image file name
  const imageName = `image${incorrectGuesses}.png`;
  const imageSrc =
    imageName === "image0.png"
      ? image0
      : imageName === "image1.png"
      ? image0
      : imageName === "image2.png"
      ? image1
      : imageName === "image3.png"
      ? image2
      : imageName === "image4.png"
      ? image3
      : imageName === "image5.png"
      ? image4
      : imageName === "image6.png"
      ? image5
      : imageName === "image7.png"
      ? image6
      : imageName === "image8.png"
      ? image7
      : imageName === "image9.png"
      ? image8
      : "";

  return <img src={imageSrc} alt="Hangman" />;
}

export default ImageGen;
