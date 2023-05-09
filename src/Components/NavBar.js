import { AppBar, Tabs, Tab, Paper } from "@mui/material";
import React, { useContext } from "react";
import { sections } from "../data/siteContent";

import { ScrollContext, MobileContext } from "../App";

const NavBar = ({ doScroll }) => {
  const activeSection = useContext(ScrollContext);
  const handleChange = (event, newValue) => {
    doScroll(sections[newValue]);
  };
  const isMobile = useContext(MobileContext);
  const menuItems = sections.map((title) => {
    return <Tab label={title} key={title} />;
  });
  return (
    <AppBar position="sticky">
      <Paper>
        <Tabs
          value={sections.indexOf(activeSection)}
          onChange={handleChange}
          centered={isMobile ? true : false}
        >
          {menuItems}
        </Tabs>
      </Paper>
    </AppBar>
  );
};

export default NavBar;
