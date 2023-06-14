//Taken from https://medium.com/geekculture/scrollable-single-page-site-navigation-with-react-custom-hooks-4e7af716f6b1
import React, { useEffect, useContext, useRef } from "react";
import { ScrollContext } from "../App";
import { useOnScreen } from "./useOnScreen";

const useNav = (sectionTitle) => {
  const ref = useRef(null);
  const { currentSection, setCurrentSection } = useContext(ScrollContext);
  const isOnScreen = useOnScreen(ref);
  useEffect(() => {
    if (isOnScreen) {
      setCurrentSection(sectionTitle);
    }
  }, [isOnScreen, sectionTitle, setCurrentSection]);
  return ref;
};

export default useNav;
