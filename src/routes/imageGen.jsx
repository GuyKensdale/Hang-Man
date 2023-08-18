import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import image0 from "../hangmanimages/image0.png";
import image1 from "../hangmanimages/image1.png";
import image2 from "../hangmanimages/image2.png";
import image3 from "../hangmanimages/image3.png";
import image4 from "../hangmanimages/image4.png";
import image5 from "../hangmanimages/image5.png";
import image6 from "../hangmanimages/image6.png";
import image7 from "../hangmanimages/image7.png";
import image8 from "../hangmanimages/image8.png";
function ImageGen({ incorrectGuesses }) {
  // Map incorrectGuesses to the appropriate image file name
  const imageName = `image${incorrectGuesses}.png`;
  const imageSrc =
    imageName === "image0.png"
      ? image0
      : imageName === "image1.png"
      ? image1
      : imageName === "image2.png"
      ? image2
      : imageName === "image3.png"
      ? image3
      : imageName === "image4.png"
      ? image4
      : imageName === "image5.png"
      ? image5
      : imageName === "image6.png"
      ? image6
      : imageName === "image7.png"
      ? image7
      : imageName === "image8.png"
      ? image8
      : "";

  return <img src={imageSrc} alt="Hangman" />;
}

export default ImageGen;
