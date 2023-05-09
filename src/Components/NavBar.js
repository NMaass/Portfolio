import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import siteContent from "../data/siteContent";
import NavItem from "./NavItem";

const NavBar = ({ doScroll }) => {
  const menuItems = siteContent.map((item) => {
    return (
      <NavItem
        section={item["Title"]}
        doScroll={doScroll}
        key={item["Title"]}
      />
    );
  });
  return (
    <AppBar position="sticky">
      <Toolbar>{menuItems}</Toolbar>
    </AppBar>
  );
};

export default NavBar;
