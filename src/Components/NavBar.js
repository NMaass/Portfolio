import { AppBar, Tabs, Tab, Paper } from "@mui/material";
import React, { useContext } from "react";
import { sections } from "../data/siteContent";

import { theme } from "../AppTheme";
import { ScrollContext, MobileContext } from "../App";

const NavBar = ({ doScroll }) => {
  const activeSection = useContext(ScrollContext);
  const handleChange = (event, newValue) => {
    doScroll(sections[newValue]);
  };
  const isMobile = useContext(MobileContext);
  const menuItems = sections.map((title) => {
    return (
      <Tab
        label={title}
        key={title}
        sx={{
          "&.Mui-selected": {
            backgroundColor: theme.palette.list[sections.indexOf(title) % 4],
            color: "black",
            borderRadius: "10px",
          },
        }}
      />
    );
  });
  return (
    <AppBar position="sticky" sx={{ height: "5vh" }}>
      <Paper sx={{ borderRadius: 0 }}>
        <Tabs
          value={sections.indexOf(activeSection)}
          onChange={handleChange}
          centered={isMobile ? true : false}
          indicatorColor={
            theme.palette.list[sections.indexOf(activeSection) % 3]
          }
        >
          {menuItems}
        </Tabs>
      </Paper>
    </AppBar>
  );
};

export default NavBar;
