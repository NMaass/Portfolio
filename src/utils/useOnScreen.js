//taken from https://stackoverflow.com/questions/58341787/intersectionobserver-with-react-hooks/64892655#64892655
import { useState, useEffect } from "react";

export const useOnScreen = (ref) => {
  const [isOnScreen, setOnScreen] = useState(false);

  const observer = new IntersectionObserver(
    ([entry]) => setOnScreen(entry.isIntersecting),
    {
      threshold: [0.2, 0.4, 0.6, 0.8],
    }
  );

  useEffect(() => {
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  });

  if (isOnScreen) console.log("onScreen!");

  return isOnScreen;
};
