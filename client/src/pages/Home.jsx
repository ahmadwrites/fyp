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
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GameCard from "../components/gamecard/GameCard";
import { useEffect } from "react";
import axios from "axios";
import { useCallback } from "react";
import { followGroup } from "../redux/userSlice";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [popularGroups, setPopularGroups] = useState([]);
  const [sortType, setSortType] = useState("createdAt");

  const getPosts = useCallback(async () => {
    try {
      const res = currentUser
        ? await axios.get(`/posts/preference?sortType=${sortType}`, {
            withCredentials: true,
          })
        : await axios.get("/posts");
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [currentUser, sortType]);

  const getPopularGroups = useCallback(async () => {
    try {
      const res = await axios.get("/groups/popular");
      setPopularGroups(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getPosts();
    getPopularGroups();
  }, [getPosts, getPopularGroups]);

  const handleFollow = async (groupId) => {
    try {
      if (currentUser?.followedGroups.includes(groupId)) {
        await axios.put(
          `/users/unfollow-group/${groupId}`,
          {},
          { withCredentials: true }
        );
      } else {
        await axios.put(
          `/users/follow-group/${groupId}`,
          {},
          { withCredentials: true }
        );
      }
      dispatch(followGroup(groupId));
      getPopularGroups();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser.boarding === true) {
      navigate("/boarding");
    }
  }, [currentUser, navigate]);

  // Todo: filter based on distance
  // check preferences -> if no, as nomral,
  // if yes -> get distance -> filter posts, map only less than preference distance

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
                  onClick={() => setSortType("createdAt")}
                  icon={<DynamicFeedIcon fontSize="small" />}
                  label="Custom"
                  sx={{
                    cursor: "pointer",
                    color: sortType === "createdAt" ? "#fff" : "inherit",
                  }}
                  color={sortType === "createdAt" ? "primary" : "default"}
                  variant={sortType === "createdAt" ? "filled" : "outlined"}
                />
                <Chip
                  icon={<FiberNewIcon fontSize="small" />}
                  onClick={() => setSortType("new")}
                  label="New"
                  sx={{
                    cursor: "pointer",
                    color: sortType === "new" ? "#fff" : "inherit",
                  }}
                  color={sortType === "new" ? "primary" : "default"}
                  variant={sortType === "new" ? "filled" : "outlined"}
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
              {posts.length === 0 ? (
                <>
                  <Grid
                    sx={{ marginTop: "1rem" }}
                    container
                    direction="column"
                    alignItems="center"
                  >
                    <Typography variant="h6" color="text.secondary">
                      No posts yet.
                    </Typography>
                    <Typography color="text.secondary">
                      Consider following more groups or changing your
                      preferences.
                    </Typography>
                  </Grid>
                </>
              ) : (
                <>
                  {posts.map((post) => (
                    <Grid
                      key={post?._id}
                      sx={{ display: "flex" }}
                      item
                      xs={12}
                      sm={6}
                    >
                      <GameCard getPosts={getPosts} post={post} />
                    </Grid>
                  ))}
                </>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                padding: { xs: ".5rem", md: "1rem" },
              }}
            >
              <Typography mb={1} sx={{ fontWeight: 500 }}>
                Welcome to Sportify!
              </Typography>
              <Typography mb={1} color="text.secondary">
                Sportify is an online sports-matchmaking application where you
                can meet people that play the same sports with you and setup
                quick games! You can find others that are nearby you and on a
                similar skill level to maximize the game experience! Or you can
                explore different and unique games happening close to you.
              </Typography>
              <Divider sx={{ margin: ".5rem 0" }} />
              <Button
                fullWidth
                color="tertiary"
                component={RouterLink}
                to="/games/create"
                variant="contained"
              >
                Create Game
              </Button>
            </Paper>
            <Paper
              sx={{
                marginTop: "1rem",
                padding: { xs: ".5rem", md: "1rem" },
              }}
            >
              <Grid container justifyContent="space-between">
                <Typography mb={1} sx={{ fontWeight: 500 }}>
                  Popular Groups
                </Typography>
                <Button
                  component={RouterLink}
                  to="/groups"
                  size="small"
                  color="inherit"
                >
                  View All
                </Button>
              </Grid>
              <List
                sx={{
                  width: "100%",
                }}
              >
                {popularGroups?.map((group) => (
                  <Box key={group?._id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          component={RouterLink}
                          to={`/groups/${group?.title}`}
                          src={group?.avatar}
                        />
                      </ListItemAvatar>
                      <ListItemButton
                        dense
                        component={RouterLink}
                        to={`/groups/${group?.title}`}
                      >
                        <ListItemText
                          primary={group?.title}
                          secondary={`${group?.followers} Follower${
                            group?.followers !== 1 ? "s" : ""
                          }`}
                        />
                      </ListItemButton>
                      {currentUser ? (
                        <>
                          {currentUser?.followedGroups?.includes(group._id) ? (
                            <Button
                              onClick={() => handleFollow(group._id)}
                              variant="text"
                              size="small"
                              color="error"
                            >
                              Unfollow
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleFollow(group._id)}
                              variant="text"
                              size="small"
                              color="tertiary"
                            >
                              Follow
                            </Button>
                          )}
                        </>
                      ) : (
                        <>
                          <Button
                            component={RouterLink}
                            to="/login"
                            variant="text"
                            size="small"
                            color="tertiary"
                          >
                            Follow
                          </Button>
                        </>
                      )}
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </Box>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
