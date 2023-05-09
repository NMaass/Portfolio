import "./App.css";
import ContentArea from "./Components/ContentArea";
import React, { createContext } from "react";
import siteContent from "./data/siteContent";
import { useMediaQuery } from "@mui/material";

const MobileContext = createContext();
function App() {
  const isMobile = useMediaQuery("(max-width: 1023px)");
  console.log(siteContent);
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
  return (
    <div>
      <MobileContext.Provider value={isMobile}>
        {listContent}
      </MobileContext.Provider>
    </div>
  );
}

export default App;
export { MobileContext };
