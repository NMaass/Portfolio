import "./App.css";
import ContentArea from "./Components/ContentArea";
import React, { createContext, useEffect } from "react";
import siteContent from "./data/siteContent";
import { useMediaQuery } from "@mui/material";
import NavBar from "./Components/NavBar";
import { Route, Routes, useParams } from "react-router-dom";

export const MobileContext = createContext();
export const ScrollContext = createContext();
function App() {
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const { initialSection } = useParams();
  const [currentSection, setCurrentSection] = React.useState(
    siteContent[0]["Title"]
  );
  const listContent = siteContent.map((item, index) => {
    return (
      <ContentArea
        text={item["Description"]}
        media={item["Media"]}
        title={item["Title"]}
        key={index}
        index={index}
      />
    );
  });

  console.log("initialSection", initialSection);
  useEffect(() => {
    if (initialSection) {
      console.log("initialSection scrolling", initialSection);
      doScroll(initialSection);
      initialSection = null;
    }
  }, []);
  const doScroll = (section) => {
    if (section === currentSection) return;

    setCurrentSection(section);
    document.getElementById(section).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <MobileContext.Provider value={isMobile}>
        <ScrollContext.Provider value={currentSection}>
          <NavBar doScroll={doScroll} />
          {listContent}
        </ScrollContext.Provider>
      </MobileContext.Provider>
    </div>
  );
}

export default App;
