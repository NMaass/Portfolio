import "./App.css";
import ContentArea from "./Components/ContentArea";
import React, { createContext } from "react";
import siteContent from "./data/siteContent";
import { useMediaQuery } from "@mui/material";
import NavBar from "./Components/NavBar";

const MobileContext = createContext();
function App() {
  const isMobile = useMediaQuery("(max-width: 1023px)");
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
        id={item["Title"]}
      />
    );
  });
  const doScroll = (section) => {
    if (section === currentSection) return;

    setCurrentSection(section);
    console.log(section, document.getElementById(section));
    document.getElementById(section).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <MobileContext.Provider value={isMobile}>
        <NavBar doScroll={doScroll} />
        {listContent}
      </MobileContext.Provider>
    </div>
  );
}

export default App;
export { MobileContext };
