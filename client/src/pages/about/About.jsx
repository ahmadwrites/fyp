import {
  Avatar,
  Box,
  Button,
  Divider,
  Fade,
  Grid,
  Grow,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useMemo, useRef, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import SwipeRightIcon from "@mui/icons-material/SwipeRight";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import ShieldIcon from "@mui/icons-material/Shield";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";

import theme from "../../theme";
import Banner_2 from "../../images/banner_2.jpg";
import Banner_1 from "../../images/banner_1.jpg";
import img1 from "../../images/square_1.jpg";
import img2 from "../../images/square_2.jpg";
import img3 from "../../images/square_3.jpg";
import img4 from "../../images/square_4.jpg";
import img5 from "../../images/square_5.jpg";
import img6 from "../../images/square_6.jpg";
import img7 from "../../images/square_7.jpg";
import me from "../../images/me.jpg";

function useIsInViewport(ref) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIsIntersecting(entry.isIntersecting)
      ),
    []
  );

  useEffect(() => {
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
}

const About = () => {
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const ref1 = useRef(null);
  const isInViewport1 = useIsInViewport(ref1);

  const cardContainerRef = useRef(null);
  const isInViewPort2 = useIsInViewport(cardContainerRef);

  return (
    <Box sx={{ minHeight: "calc(100vh - 64px)" }}>
      <Box
        sx={{
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: `
          linear-gradient(180deg, 
            rgba(255,255,255,0.1) 0%, 
            rgba(0,0,0,0.8) 50%, 
            rgba(0,0,0,1) 100%), url('${Banner_2}')
            `,
          height: "calc(100vh - 64px)",
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Fade in={true} appear={true} timeout={2000}>
          <Typography
            sx={{
              fontWeight: 500,
              letterSpacing: "3px",
              background: `-webkit-linear-gradient(180deg, #fff 33%, #fff 67%)`,
              "-webkit-background-clip": "text",
              " -webkit-text-fill-color": "transparent",
            }}
            variant="h1"
          >
            Sportify
          </Typography>
        </Fade>

        <Fade in={true} appear={true} timeout={1500}>
          <Button
            variant="contained"
            color="tertiary"
            size={isMatch ? "medium" : "large"}
          >
            About Us
          </Button>
        </Fade>
      </Box>

      <Container maxWidth="lg">
        <Box sx={{ padding: { xs: "1rem", md: "2rem" } }}>
          <Typography
            sx={{
              background: `-webkit-linear-gradient(30deg, ${theme.palette.secondary.main} 33%, ${theme.palette.tertiary.main} 67%)`,
              "-webkit-background-clip": "text",
              " -webkit-text-fill-color": "transparent",
              fontWeight: 600,
            }}
            variant="h4"
            marginBottom={{ xs: "1rem", md: "2rem" }}
          >
            Find Players to Play With You
          </Typography>
          <Grid container spacing={{ xs: 2, md: 6 }}>
            <Grid item xs={12} md={6}>
              <Avatar
                src={img2}
                variant="rounded"
                sx={{ width: "100%", height: { xs: 250, md: 350 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ lineHeight: 1.75, textAlign: "justify" }}>
                Ever wanted to play a sport or activity but couldn't find enough
                players to join? Had enough players but a sudden event made one
                or two cancel? With sportify, you can add your listing and
                players of similar skill, level and location can join your game
                making each game a complete experience! It's as smiple as:
              </Typography>
              <Grow
                ref={ref1}
                in={isInViewport1 ? true : false}
                appear={true}
                timeout={1500}
              >
                <Stepper
                  sx={{ marginTop: { xs: "1rem", md: "2rem" } }}
                  activeStep={3}
                  alternativeLabel
                >
                  <Step>
                    <StepLabel icon={<CreateIcon color="tertiary" />}>
                      Create Listing
                    </StepLabel>
                  </Step>
                  <Step>
                    <StepLabel icon={<SwipeRightIcon color="tertiary" />}>
                      Accepts Requests
                    </StepLabel>
                  </Step>
                  <Step>
                    <StepLabel icon={<SportsEsportsIcon color="tertiary" />}>
                      Play!
                    </StepLabel>
                  </Step>
                </Stepper>
              </Grow>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Box
        sx={{
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: `
          linear-gradient(0deg, 
            rgba(255,255,255,0.1) 0%, 
            rgba(0,0,0,0.8) 80%, 
            rgba(0,0,0,1) 100%), url('${Banner_1}')
            `,
          minHeight: "calc(100vh - 64px)",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            padding: { xs: "1rem", md: "2rem" },
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              background: `-webkit-linear-gradient(0deg, #FFF 40%,${theme.palette.tertiary.main} )`,
              "-webkit-background-clip": "text",
              " -webkit-text-fill-color": "transparent",
              fontWeight: 600,
            }}
            variant="h4"
            marginBottom={{ xs: "1rem", md: "2rem" }}
          >
            Feature Packed Application
          </Typography>

          <Grid ref={cardContainerRef} container spacing={{ xs: 2, md: 4 }}>
            <Grow
              in={isInViewPort2 ? true : false}
              appear={true}
              timeout={1500}
            >
              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  "&:hover": { transform: "scale(1.025)" },
                  transition: ".3s ease all",
                }}
              >
                <Paper elevation={20}>
                  <img
                    variant="rounded"
                    style={{
                      width: "100%",
                      height: isMatch ? 220 : 200,
                      objectPosition: "top",
                      objectFit: "cover",
                    }}
                    alt=""
                    src={img3}
                  />
                  <Box
                    sx={{
                      padding: { xs: ".5rem", md: "1rem" },
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h6">Room Live Chats</Typography>
                    <Typography varaint="body2">
                      Secure live chat channels to discuss game events.
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grow>

            <Grow
              in={isInViewPort2 ? true : false}
              appear={true}
              timeout={1500}
            >
              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  "&:hover": { transform: "scale(1.025)" },
                  transition: ".3s ease all",
                }}
              >
                <Paper elevation={20}>
                  <img
                    style={{
                      width: "100%",
                      height: isMatch ? 220 : 200,
                      objectPosition: "top",
                      objectFit: "cover",
                    }}
                    alt=""
                    src={img7}
                  />
                  <Box
                    sx={{
                      padding: { xs: ".5rem", md: "1rem" },
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h6">Advanced Matchmaking</Typography>
                    <Typography varaint="body2">
                      Filter & sort out the players you want to play with.
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grow>

            <Grow
              in={isInViewPort2 ? true : false}
              appear={true}
              timeout={1500}
            >
              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  "&:hover": { transform: "scale(1.025)" },
                  transition: ".3s ease all",
                }}
              >
                <Paper elevation={20}>
                  <img
                    style={{
                      width: "100%",
                      height: isMatch ? 220 : 200,
                      objectPosition: "top",
                      objectFit: "cover",
                    }}
                    alt=""
                    src={img6}
                  />
                  <Box
                    sx={{
                      padding: { xs: ".5rem", md: "1rem" },
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h6">Explore New Games</Typography>
                    <Typography varaint="body2">
                      Find games based on your local area that may interest you!
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grow>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Box sx={{ padding: { xs: "1rem", md: "2rem" } }}>
          <Typography
            sx={{
              background: `-webkit-linear-gradient(30deg, ${theme.palette.secondary.main}, ${theme.palette.tertiary.main})`,
              "-webkit-background-clip": "text",
              " -webkit-text-fill-color": "transparent",
              fontWeight: 600,
            }}
            variant="h4"
            marginBottom={{ xs: "1rem", md: "2rem" }}
          >
            Vision & Mission
          </Typography>

          <Grid container spacing={{ xs: 2, md: 6 }}>
            <Grid item xs={12} md={6}>
              <Typography sx={{ lineHeight: 1.75, textAlign: "justify" }}>
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Consequatur ab omnis placeat deleniti consectetur quidem fugit
                facilis ullam. Rerum impedit veritatis aperiam itaque nostrum.
                Beatae aspernatur possimus itaque assumenda natus molestiae
                velit molestias, quas porro nobis recusandae officiis sapiente,
                hic aliquid obcaecati odio ipsa similique ab corrupti sunt nemo
                eligendi quaerat error accusantium? Maiores amet architecto
                laborum. A, fugiat deserunt."
              </Typography>
              <Grid
                container
                alignItems="center"
                sx={{ gap: "1rem", marginTop: { xs: "1rem", md: "1rem" } }}
              >
                <Avatar
                  src={me}
                  sx={{
                    height: "3rem",
                    width: "3rem",
                    border: `2px solid ${theme.palette.tertiary.main}`,
                  }}
                />
                <Box>
                  <Typography>Ahmad Hasnol</Typography>
                  <Typography color="text.secondary" variant="body2">
                    Creator
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper sx={{ padding: "1rem" }}>
                    <Typography
                      variant="h6"
                      color="tertiary"
                      sx={{
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: ".5rem",
                      }}
                      mb={1}
                    >
                      <AccessibilityIcon color="tertiary" />
                      Accessible
                    </Typography>
                    <Divider />
                    <Typography variant="body2" mt={1} color="text.secondary">
                      Made for everyone.
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={6}>
                  <Paper sx={{ padding: "1rem" }}>
                    <Typography
                      variant="h6"
                      color="tertiary"
                      sx={{
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: ".5rem",
                      }}
                      mb={1}
                    >
                      <ShieldIcon color="tertiary" />
                      Secure
                    </Typography>
                    <Divider />
                    <Typography variant="body2" mt={1} color="text.secondary">
                      Passwords are hashed.
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={6}>
                  <Paper sx={{ padding: "1rem" }}>
                    <Typography
                      variant="h6"
                      color="tertiary"
                      sx={{
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: ".5rem",
                      }}
                      mb={1}
                    >
                      <DevicesOtherIcon color="tertiary" />
                      Responsive
                    </Typography>
                    <Divider />
                    <Typography variant="body2" mt={1} color="text.secondary">
                      Made for all screen sizes.
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={6}>
                  <Paper sx={{ padding: "1rem" }}>
                    <Typography
                      variant="h6"
                      color="tertiary"
                      sx={{
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: ".5rem",
                      }}
                      mb={1}
                    >
                      <InsertEmoticonIcon color="tertiary" />
                      Adaptable
                    </Typography>
                    <Divider />
                    <Typography variant="body2" mt={1} color="text.secondary">
                      You love to see it.
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
