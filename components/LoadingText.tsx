import { useState, useEffect } from "react";

const LoadingText = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => (count + 1) % 4);
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, []);

  let loadingStr = "laster";
  for (let i = 0; i < count; i++) {
    loadingStr += ".";
  }

  return <p style={{color: "white"}}>{loadingStr}</p>;
};

export default LoadingText;
