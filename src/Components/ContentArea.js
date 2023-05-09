import React, { useEffect, useContext } from "react";
import {
  Container,
  Divider,
  Fade,
  Paper,
  Slide,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { MobileContext } from "../App";
import { theme } from "../AppTheme";

const ContentArea = ({ text, media, title, index }) => {
  const [loaded, setLoaded] = React.useState(false);
  useEffect(() => {
    setLoaded(true);
  });
  const isMobile = useContext(MobileContext);
  return (
    <Container
      maxWidth="xl"
      sx={{
        height: "50vh",
      }}
      id={title}
    >
      <Fade in={loaded}>
        <Slide direction="left" in={loaded}>
          <div>
            <Paper sx={{ backgroundColor: theme.palette.list[index % 3] }}>
              <Typography variant="h2" sx={{ textAlign: "left" }}>
                {title}
              </Typography>
              <Divider />
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
