import React, { useState, useCallback, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Avatar,
  Paper,
  TextField,
  Chip,
  useMediaQuery,
  Button,
  Divider,
  Tooltip,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GameCard from "../../components/gamecard/GameCard";
import axios from "axios";
import { useLocation } from "react-router-dom";
import moment from "moment";
import theme from "../../theme";

import CakeIcon from "@mui/icons-material/Cake";
import { Stack } from "@mui/system";
import { followGroup } from "../../redux/userSlice";
import serverUrl from "../../utils/serverUrl";

const Group = () => {
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/")[2];
  const [posts, setPosts] = useState([]);
  const [group, setGroup] = useState();
  const [sortType, setSortType] = useState("createdAt");

  const handleFollow = async (groupId) => {
    try {
      if (currentUser.followedGroups.includes(groupId)) {
        await axios.put(
          `${serverUrl}/users/unfollow-group/${groupId}`,
          {},
          { withCredentials: true }
        );
      } else {
        await axios.put(
          `${serverUrl}/users/follow-group/${groupId}`,
          {},
          { withCredentials: true }
        );
      }
      dispatch(followGroup(groupId));
      getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const getPosts = useCallback(async () => {
    try {
      const res = await axios.get(
        `${serverUrl}/posts/group/${location}?sortType=${sortType}`
      );
      if (res.data.message) return navigate("/groups");
      setPosts(res.data.posts);
      setGroup(res.data.group);
    } catch (error) {
      console.log(error);
    }
  }, [location, navigate, sortType]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Box sx={{ minHeight: "calc(100vh - 64px)" }}>
      <Box
        sx={{
          position: "relative",
          height: { xs: "120px", md: "200px" },
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.8) 60%, rgba(0,0,2,1) 100%), url('${group?.banner}')`,
        }}
      >
        <Box
          sx={{
            padding: { xs: ".5rem", md: "1rem" },
            position: "absolute",
            zIndex: 10,
            bottom: 0,
          }}
        >
          <Container maxWidth="lg">
            <Grid container sx={{ gap: "1rem" }}>
              <Avatar
                variant="rounded"
                src={group?.avatar}
                sx={{
                  width: { xs: "64px", md: "100px" },
                  height: { xs: "64px", md: "100px" },
                }}
              />
              <Typography
                sx={{ color: "#fff", fontWeight: "500" }}
                variant="h5"
              >
                {group?.title}
              </Typography>
              <Grid item>
                {currentUser ? (
                  <>
                    {currentUser?.followedGroups.includes(group?._id) ? (
                      <Button
                        onClick={() => handleFollow(group?._id)}
                        variant="text"
                        size="small"
                        color="error"
                      >
                        Unfollow
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleFollow(group?._id)}
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
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      <Container maxWidth="lg" sx={{ padding: { xs: ".5rem", md: "1rem" } }}>
        <Grid
          container
          spacing={isMatch ? 2 : 3}
          justifyContent="space-between"
        >
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
                <Grid item xs={2} md={1}>
                  <Avatar src={currentUser?.avatar} />
                </Grid>
                <Grid item xs={9} md={11}>
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
                  label="New"
                  onClick={() => setSortType("new")}
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
                    sx={{ marginTop: "1rem", textAlign: "center" }}
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
                position: { xs: "relative", md: "sticky" },
                top: { xs: "0", md: "80px" },
                padding: { xs: ".5rem", md: "1rem" },
              }}
            >
              <Typography mb={1} sx={{ fontWeight: 500 }}>
                Welcome to {location}!
              </Typography>
              <Typography mb={1} color="text.secondary">
                {group?.desc}
              </Typography>
              <Stack direction="row" spacing={1}>
                <CakeIcon fontSize="small" />
                <Typography>
                  Created {moment(group?.createdAt).format("MMM DD, YYYY")}
                </Typography>
              </Stack>
              <Divider sx={{ margin: ".5rem 0" }} />
              <Grid container>
                <Grid item xs={6}>
                  <Typography>{group?.followers}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Followers
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Tooltip
                    followCursor
                    title="Change your preferences for more potentially available games."
                  >
                    <Box>
                      <Typography>
                        {
                          posts.filter((post) => post?.isCompleted === false)
                            .length
                        }
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Available Game
                        {posts.filter((post) => post?.isCompleted === false)
                          .length !== 1
                          ? "s"
                          : ""}
                      </Typography>
                    </Box>
                  </Tooltip>
                </Grid>
              </Grid>
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
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Group;
