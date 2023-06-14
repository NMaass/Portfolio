import { IconButton } from "@mui/material";
import React from "react";

const IconButtonList = ({ iconData, size }) => {
  const buttonLink = (link) => {
    window.location.href = link;
  };
  return (
    <div>
      {iconData.map((iconData) => {
        return (
          <IconButton
            onClick={() => buttonLink(iconData["Link"])}
            key={iconData["Link"]}
            size={size}
          >
            {iconData["Icon"]}
          </IconButton>
        );
      })}
    </div>
  );
};
export default IconButtonList;
