import { AppBar, Tabs, Tab } from "@mui/material";
import React, { useContext } from "react";
import { sections } from "../data/siteContent";

import { ScrollContext } from "../App";

const NavBar = ({ doScroll }) => {
  const activeSection = useContext(ScrollContext);
  const handleChange = (event, newValue) => {
    doScroll(sections[newValue]);
  };
  const menuItems = sections.map((title) => {
    return <Tab label={title} key={title} />;
  });
  return (
    <AppBar position="sticky">
      <Tabs
        value={sections.indexOf(activeSection)}
        onChange={handleChange}
        centered
      >
        {menuItems}
      </Tabs>
    </AppBar>
  );
};

export default NavBar;
