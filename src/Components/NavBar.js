import { AppBar, Tabs, Tab, Paper } from "@mui/material";
import React, { useContext } from "react";
import { sections } from "../data/siteContent";
import IconButtonList from "./IconButtonList";
import { personalLinks } from "../data/personalLinks";
import { theme } from "../AppTheme";
import { ScrollContext, MobileContext } from "../App";
import { useEffect } from "react";
import { MobileLinks } from "./MobileLinks";
import Grid from "@mui/material/Unstable_Grid2";

const NavBar = ({ doScroll }) => {
  const { currentSection, setCurrentSection } = useContext(ScrollContext);
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
        <Grid container>
          <Grid xs={10.5}>
            <Tabs
              value={sections.indexOf(currentSection)}
              onChange={handleChange}
              centered={isMobile ? true : false}
              indicatorColor={
                theme.palette.list[sections.indexOf(currentSection) % 3]
              }
            >
              {menuItems}
            </Tabs>
          </Grid>
          <Grid xs={1.5}>
            {!isMobile && (
              <IconButtonList iconData={personalLinks} size="large" />
            )}
          </Grid>
        </Grid>
      </Paper>
    </AppBar>
  );
};

export default NavBar;
