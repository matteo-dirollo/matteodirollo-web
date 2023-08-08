import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";

const LottieIcon = ({ animationData: lottieUrl }) => {
    const [animationJSON, setAnimationJSON] = useState(null);
  useEffect(() => {
    // Fetch the Lottie JSON data from the URL
    fetch(lottieUrl)
      .then((response) => response.json())
      .then((data) => setAnimationJSON(data))
      .catch((error) => console.error("Failed fetching Lottie data:", error));
  }, [lottieUrl]);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationJSON,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return animationJSON ? <Lottie options={defaultOptions} /> : null;
};

export default LottieIcon;
