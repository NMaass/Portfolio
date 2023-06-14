import React from "react";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";

export const MobileLinks = ({ iconData }) => {
  const buttonLink = (link) => {
    window.location.href = link;
  };
  return (
    <SpeedDial
      direction="down"
      ariaLabel="Mobile Links"
      icon={<SpeedDialIcon />}
    >
      {iconData.map((iconData) => {
        return (
          <SpeedDialAction
            key={iconData["Link"]}
            tooltipTitle={iconData["name"]}
            icon={iconData["Icon"]}
            onClick={() => buttonLink(iconData["Link"])}
          />
        );
      })}
    </SpeedDial>
  );
};
