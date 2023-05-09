import "./App.css";
import ContentArea from "./Components/ContentArea";
import React, { createContext, useEffect } from "react";
import siteContent from "./data/siteContent";
import { useMediaQuery } from "@mui/material";
import NavBar from "./Components/NavBar";
import { useParams } from "react-router-dom";
import { useOnScreen } from "./utils/useOnScreen";
import Grid from "@mui/material/Unstable_Grid2";

export const MobileContext = createContext();
export const ScrollContext = createContext();
function App() {
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const { initialSection } = useParams();
  const ref = React.useRef(null);
  //const isOnScren = useOnScreen(ref.current);
  const [currentSection, setCurrentSection] = React.useState(
    siteContent[0]["Title"]
  );

  const listContent = siteContent.map((item, index) => {
    return (
      <Grid key={index}>
        <ContentArea
          text={item["Description"]}
          media={item["Media"]}
          title={item["Title"]}
          index={index}
        />
      </Grid>
    );
  });

  useEffect(() => {
    if (initialSection) {
      siteContent.forEach((item) => {
        if (item["Title"] === initialSection) {
          doScroll(initialSection);
        }
      });
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
          <Grid
            container
            direction="column"
            justifyContent="center"
            spacing={isMobile ? 2 : 6}
          >
            {listContent}
          </Grid>
        </ScrollContext.Provider>
      </MobileContext.Provider>
    </div>
  );
}

export default App;
