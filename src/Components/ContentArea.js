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

const ContentArea = ({ section, index }) => {
  const isMobile = useContext(MobileContext);
  return (
    <Container maxWidth="xl">
      <div>
        <Typography
          variant="h2"
          sx={{ textAlign: "left" }}
          id={section["Title"]}
          marginBottom="4rem"
        >
          {section["Title"]}
        </Typography>
        <Divider />
        <Paper
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
