import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import image0 from "../hangmanimages/image0.jpeg";
import image1 from "../hangmanimages/image1.jpeg";
import image2 from "../hangmanimages/image2.jpeg";
import image3 from "../hangmanimages/image3.jpeg";
import image8 from "../hangmanimages/image8.jpeg";
import image4 from "../hangmanimages/image4.jpeg";
import image5 from "../hangmanimages/image5.jpeg";
import image6 from "../hangmanimages/image6.jpeg";
import image7 from "../hangmanimages/image7.jpeg";

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
