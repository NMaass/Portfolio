import "./App.css";
import ContentArea from "./Components/ContentArea";
import React from "react";
import MobileDrag from "./assets/MobileDrag.gif";

function App() {
  return (
    <div>
      <ContentArea
        title={"title"}
        direction={"right"}
        text={"text"}
        media={MobileDrag}
      />
    </div>
  );
}

export default App;
