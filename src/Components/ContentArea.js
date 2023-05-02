import React, { useEffect } from "react";
import { Container, Fade, Grid, Paper, Slide, Typography } from "@mui/material";

const ContentArea = ({ text, media, reversed }) => {
  const [loaded, setLoaded] = React.useState(false);
  useEffect(() => {
    setLoaded(true);
  });
  return (
    <Container sx={{ width: "100vw", height: "50vh" }}>
      <Fade in={loaded}>
        <Slide direction={reversed ? "left" : "right"} in={loaded}>
          <Paper>
            <Grid container direction={reversed ? "row" : "row-reverse"}>
              <Grid item xs={10} md={10}>
                <img src={media} style={{ maxHeight: "48vh" }} />
              </Grid>
              <Grid item xs={2} md={2}>
                <Typography variant="h6">{text}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Slide>
      </Fade>
    </Container>
  );
};
export default ContentArea;
