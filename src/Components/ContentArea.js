import React, { useEffect, useContext } from "react";
import {
  Container,
  Divider,
  Fade,
  Link,
  Paper,
  Slide,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { MobileContext } from "../App";
import { theme } from "../AppTheme";
import ContentCard from "./ContentCard";
import useNav from "../utils/useNav";

const ContentArea = ({ section, index }) => {
  const isMobile = useContext(MobileContext);
  const sectionRef = useNav(section["Title"]);
  return (
    <Container maxWidth="xl" ref={sectionRef}>
      <div>
        <Typography variant="h2" sx={{ textAlign: "left" }} marginBottom="4rem">
          {section["Title"]}
        </Typography>
        <Divider />
        <Paper
          id={isMobile ? section["Title"] : ""} //Side effect of scroll correction hack
          sx={{
            backgroundColor: theme.palette.list[index % 4],
          }}
        >
          <Grid
            container
            spacing={10}
            justifyContent="center"
            alignItems="center"
          >
            {section["Content"].map((content) => {
              return (
                <Grid xs={11}>
                  <ContentCard
                    title={content["Title"]}
                    description={content["Description"]}
                    icons={content["Icons"]}
                    media={content["Media"]}
                    mediaAlt={content["MediaAlt"]}
                    embed={content["Embed"]}
                    key={content["Title"]}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Paper>
      </div>
    </Container>
  );
};
export default ContentArea;
