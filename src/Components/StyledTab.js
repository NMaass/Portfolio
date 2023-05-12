import React from "react";
import styled from "styled-components";
import { theme } from "../AppTheme";
import { Tab } from "@mui/material";

const StyledTab = styled((props) => <Tab {...props} />)(({ theme, index }) => ({
  "&.Mui-selected": {
    backgroundColor: theme.palette.list[index % 4],
  },
}));
export default StyledTab;
