import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Avatar,
  Paper,
  TextField,
  Chip,
  Button,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import GameCard from "../components/gamecard/GameCard";
import { useEffect } from "react";
import axios from "axios";
import { useCallback } from "react";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);

  const getPosts = useCallback(async () => {
    try {
      const res = await axios.get("/posts");
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Box sx={{ minHeight: "calc(100vh - 64px)" }}>
      <Container maxWidth="lg" sx={{ padding: { xs: ".5rem", md: "1rem" } }}>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid
            sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            item
            xs={12}
            md={8}
          >
            <Paper>
              <Grid
                container
                wrap="nowrap"
                alignItems="center"
                sx={{
                  padding: { xs: ".5rem", md: "1rem" },
                  gap: { xs: ".5rem", md: "0" },
                }}
              >
                <Grid item xs={1}>
                  <Avatar src={currentUser?.avatar} />
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    component={RouterLink}
                    to="/games/create"
                    size="small"
                    fullWidth
                    placeholder="Create Game"
                    sx={{ textDecoration: "none" }}
                    inputProps={{ style: { cursor: "pointer" } }}
                  />
                </Grid>
              </Grid>
            </Paper>

            <Paper>
              <Grid
                container
                wrap="nowrap"
                alignItems="center"
                sx={{
                  padding: { xs: ".5rem", md: "1rem" },
                  gap: { xs: ".5rem" },
                }}
              >
                <Chip
                  component={RouterLink}
                  to="/"
                  icon={<DynamicFeedIcon fontSize="small" />}
                  label="Custom"
                  sx={{ cursor: "pointer" }}
                />
                <Chip
                  component={RouterLink}
                  to="/soon"
                  icon={<WhatshotIcon fontSize="small" />}
                  label="Soon"
                  sx={{ cursor: "pointer" }}
                  variant="outlined"
                />
                <Chip
                  component={RouterLink}
                  icon={<FiberNewIcon fontSize="small" />}
                  label="New"
                  sx={{ cursor: "pointer" }}
                  to="/new"
                  variant="outlined"
                />
                <Grid container alignItems="center" justifyContent="flex-end">
                  <Button
                    variant="text"
                    size="small"
                    sx={{ display: "flex", alignItems: "center" }}
                    color="inherit"
                    component={RouterLink}
                    to="/settings/preferences"
                  >
                    <TuneIcon fontSize="small" />
                    <Typography ml={1} color="text.primary">
                      Preferences
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Paper>

            <Grid container alignItems="stretch" spacing={2}>
              {posts.map((post) => (
                <GameCard getPosts={getPosts} post={post} key={post?._id} />
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}></Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
