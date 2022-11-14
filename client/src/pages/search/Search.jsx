import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Chip,
  Avatar,
  AvatarGroup,
  Link,
  Divider,
  Button,
} from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import ListingCard from "../../components/profile/ListingCard";
import { followGroup } from "../../redux/userSlice";
import theme from "../../theme";

const Search = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [groups, setGroups] = useState([]);

  const getGroups = useCallback(async () => {
    try {
      const groupRes = await axios.get(
        `/groups/search?q=${searchParams.get("title")}`
      );
      setGroups(groupRes.data);
    } catch (error) {
      console.log(error);
    }
  }, [searchParams]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const postsRes = await axios.get(
          `/posts/search?title=${searchParams.get("title")}`
        );
        setPosts(postsRes.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPosts();
    getGroups();
  }, [searchParams, getGroups]);

  const handleFollow = async (groupId) => {
    try {
      if (currentUser.followedGroups.includes(groupId)) {
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
      getGroups();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ minHeight: "calc(100vh - 64px)" }}>
      <Container maxWidth="md" sx={{ padding: { xs: ".5rem", md: "1rem" } }}>
        <Paper sx={{ padding: "1rem" }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 500, marginBottom: ".5rem" }}
            color="text.primary"
          >
            Searching for: {searchParams.get("title")}
          </Typography>
          <Grid container sx={{ gap: ".5rem" }}>
            <Chip
              onClick={() => setFilter("posts")}
              label="Games"
              sx={{
                cursor: "pointer",
                color: filter === "posts" ? "#fff" : "inherit",
              }}
              color={filter === "posts" ? "primary" : "default"}
              variant={filter === "posts" ? "filled" : "outlined"}
            />
            <Chip
              onClick={() => setFilter("groups")}
              label="Groups"
              sx={{
                cursor: "pointer",
                color: filter === "groups" ? "#fff" : "inherit",
              }}
              color={filter === "groups" ? "primary" : "default"}
              variant={filter === "groups" ? "filled" : "outlined"}
            />
          </Grid>
          {filter === "posts" ? (
            <>
              {posts?.length === 0 ? (
                <Grid
                  container
                  justifyContent="center"
                  sx={{ marginTop: "1rem" }}
                >
                  <Typography
                    sx={{ textAlign: "center" }}
                    variant="h6"
                    color="text.secondary"
                  >
                    No posts match the search
                  </Typography>
                </Grid>
              ) : (
                <>
                  <Grid
                    container
                    columnSpacing={2}
                    sx={{ marginTop: "1rem", rowGap: "1rem" }}
                  >
                    {posts.map((post) => (
                      <Grid key={post?._id} item xs={12} md={6}>
                        <ListingCard post={post} />
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </>
          ) : (
            <>
              <>
                {groups?.length === 0 ? (
                  <Grid
                    container
                    justifyContent="center"
                    sx={{ marginTop: "1rem" }}
                  >
                    <Typography
                      sx={{ textAlign: "center" }}
                      variant="h6"
                      color="text.secondary"
                    >
                      No groups match the search
                    </Typography>
                  </Grid>
                ) : (
                  <>
                    <Grid
                      container
                      columnSpacing={2}
                      sx={{ marginTop: "1rem", rowGap: "1rem" }}
                    >
                      {groups.map((group) => (
                        <Grid
                          style={{ display: "flex" }}
                          key={group._id}
                          item
                          xs={12}
                          sm={6}
                        >
                          <Paper
                            elevation={1}
                            sx={{
                              width: "100%",
                              padding: { xs: "1rem .5rem", md: "1rem" },
                            }}
                          >
                            <Grid container justifyContent="space-between">
                              <Avatar
                                component={RouterLink}
                                to={`/groups/${group.title}`}
                                sx={{
                                  height: "64px",
                                  width: "64px",
                                }}
                                variant="rounded"
                                src={group.avatar}
                                alt={group.desc}
                              />
                              <Box>
                                <AvatarGroup
                                  max={3}
                                  sx={{
                                    "& .MuiAvatar-root": {
                                      width: "1.5rem",
                                      height: "1.5rem",
                                      fontSize: "8px",
                                    },
                                  }}
                                >
                                  <Avatar
                                    sx={{
                                      height: "1.5rem",
                                      width: "1.5rem",
                                      fontSize: "8px",
                                    }}
                                  />
                                  <Avatar
                                    sx={{
                                      height: "1.5rem",
                                      width: "1.5rem",
                                      fontSize: "8px",
                                    }}
                                  />
                                  <Avatar
                                    sx={{
                                      height: "1.5rem",
                                      width: "1.5rem",
                                      fontSize: "8px",
                                    }}
                                  />
                                </AvatarGroup>
                                <Typography
                                  variant="body2"
                                  color="text.disabled"
                                >
                                  {group.followers} Follower
                                  {group.followers !== 1 && <span>s</span>}
                                </Typography>
                              </Box>
                            </Grid>
                            <Divider sx={{ margin: "1rem 0 .5rem" }} />
                            <Link
                              sx={{
                                color: "inherit",
                                "&:hover": {
                                  color: theme.palette.secondary.main,
                                },
                              }}
                              to={`/groups/${group.title}`}
                              component={RouterLink}
                            >
                              <Typography variant="h6" color="text.primary  ">
                                {group.title}
                              </Typography>
                            </Link>
                            <Typography
                              sx={{
                                display: "-webkit-box",
                                overflow: "hidden",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 2,
                              }}
                              variant="body2"
                              color="text.secondary"
                            >
                              {group.desc}
                            </Typography>
                            <Grid mt={1} container justifyContent="flex-end">
                              {currentUser ? (
                                <>
                                  {currentUser?.followedGroups.includes(
                                    group._id
                                  ) ? (
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
                            </Grid>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </>
                )}
              </>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Search;
