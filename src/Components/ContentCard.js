import React, { useEffect, useState, useContext } from "react";
import { Fade, Slide, Divider, Paper, Typography, Link } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { MobileContext } from "../App";
import IconButtonList from "./IconButtonList";

const ContentCard = ({ title, description, media, mediaAlt, embed, icons }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  });

  const isMobile = useContext(MobileContext);
  return (
    <Fade in={loaded}>
      <Slide direction="left" in={loaded}>
        <Paper
          sx={{
            borderRadius: "10px",
            width: "100%",
          }}
        >
          <Divider />

          <Grid
            container
            spacing={2}
            direction={isMobile ? "column" : "row"}
            justifyContent="flex-end"
          >
            <Grid xs={10} sx={{ paddingLeft: "1rem", paddingTop: "1rem" }}>
              <Grid container direction="column" justifyContent="flex-end">
                <Grid sx={2}>
                  <Typography variant="h4" sx={{ textAlign: "left" }}>
                    {title}
                  </Typography>
                </Grid>
                <Divider />
                <Grid sx={9}>
                  <Typography variant="h6">{description}</Typography>
                </Grid>
                <Grid sx={1}>
                  {icons && <IconButtonList iconData={icons} size="small" />}
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={isMobile ? 12 : 2}>
              <div
                style={{
                  height: "40vh",
                  width: isMobile ? "80%" : "15vw",
                  marginRight: isMobile ? "0" : "-10%",
                  marginTop: isMobile ? "0" : "-15%",
                }}
              >
                {media && (
                  <img
                    src={media}
                    alt={mediaAlt}
                    style={{
                      height: "100%",
                      float: "right",
                      border: "1px solid black",
                    }}
                  />
                )}
                {embed && (
                  <div
                    style={{
                      border: "1px solid black",

                      height: "99%",
                      width: "100%",
                    }}
                  >
                    {embed}
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Slide>
    </Fade>
  );
};
export default ContentCard;
