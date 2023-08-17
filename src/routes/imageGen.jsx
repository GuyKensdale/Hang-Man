import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import image0 from "../hangmanimages/image0.jpeg";
import image1 from "../hangmanimages/image1.jpeg";
import image2 from "../hangmanimages/image2.jpeg";
import image3 from "../hangmanimages/image3.jpeg";
import image4 from "../hangmanimages/image4.jpeg";
import image5 from "../hangmanimages/image5.jpeg";
import image6 from "../hangmanimages/image6.jpeg";
function ImageGen({ incorrectGuesses }) {
  // Map incorrectGuesses to the appropriate image file name
  const imageName = `image${incorrectGuesses}.jpeg`;
  const imageSrc =
    imageName === "image0.jpeg"
      ? image0
      : imageName === "image1.jpeg"
      ? image1
      : imageName === "image2.jpeg"
      ? image2
      : imageName === "image3.jpeg"
      ? image3
      : imageName === "image4.jpeg"
      ? image4
      : imageName === "image5.jpeg"
      ? image5
      : imageName === "image6.jpeg"
      ? image6
      : "";

  return <img src={imageSrc} alt="Hangman" />;
}

export default ImageGen;
