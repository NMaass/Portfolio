import React, { useEffect, useContext } from "react";
import { Container, Fade, Paper, Slide, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { MobileContext } from "../App";

const ContentArea = ({ text, media, title, index }) => {
  const [loaded, setLoaded] = React.useState(false);
  useEffect(() => {
    setLoaded(true);
  });
  const isMobile = useContext(MobileContext);
  return (
    <Container maxWidth="xl" sx={{ height: "50vh" }}>
      <Fade in={loaded}>
        <Slide direction="left" in={loaded}>
          <div>
            <Typography variant="h2" sx={{ textAlign: "left" }} id={title}>
              {title}
            </Typography>
            <Paper>
              <Grid
                container
                spacing={2}
                direction={isMobile ? "column" : "row"}
                justifyContent="flex-end"
              >
                <Grid xs={10}>
                  <Typography variant="h6">{text}</Typography>
                </Grid>
                <Grid xs={2}>
                  <img
                    src={media}
                    style={{ maxHeight: "40vh" }}
                    alt="example of trait ranker selection"
                  />
                </Grid>
              </Grid>
            </Paper>
          </div>
        </Slide>
      </Fade>
    </Container>
  );
};
export default ContentArea;
