import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Divider,
  Fab,
  Grid,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { useDispatch, useSelector } from "react-redux";
import theme from "../../theme";
import { useCallback } from "react";
import { followGroup } from "../../redux/userSlice";

const Groups = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [groups, setGroups] = useState([]);

  const getGroups = useCallback(async () => {
    try {
      const res = await axios.get("/groups");
      setGroups(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

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

  useEffect(() => {
    getGroups();
  }, [getGroups]);

  return (
    <Box sx={{ minHeight: "calc(100vh - 64px)" }}>
      <Container maxWidth="lg" sx={{ padding: { xs: ".5rem", md: "1rem" } }}>
        <Typography
          mb=".5rem"
          variant="h5"
          sx={{ fontWeight: 500 }}
          color="text.primary"
        >
          All Groups
        </Typography>

        <Grid alignItems="stretch" spacing={{ xs: 1, md: 2 }} container>
          {/* <Grid style={{ display: "flex" }} item xs={12} sm={6} md={3}>
            <Paper
              elevation={1}
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                padding: { xs: "1rem .5rem", md: "1rem" },
              }}
            >
              <Fab component={RouterLink} to="/groups/create" color="primary">
                <SportsEsportsIcon sx={{ color: "#FFF" }} fontSize="large" />
              </Fab>
              <Typography
                mt="1rem"
                variant="h6"
                sx={{ fontWeight: 500 }}
                color="text.primary"
              >
                Create New Group
              </Typography>
              <Typography
                sx={{ textAlign: "center" }}
                variant="body2"
                color="text.secondary"
              >
                Can't find a sport or activity? Create one here!
              </Typography>
            </Paper>
          </Grid> */}
          {groups.map((group) => (
            <Grid
              style={{ display: "flex" }}
              key={group._id}
              item
              xs={12}
              sm={6}
              md={3}
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
                      height: "48px",
                      width: "48px",
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
                          width: "1rem",
                          height: "1rem",
                          fontSize: "8px",
                        },
                      }}
                    >
                      <Avatar
                        // src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
                        sx={{
                          height: "1rem",
                          width: "1rem",
                          fontSize: "8px",
                        }}
                      />
                      <Avatar
                        // src="https://pbs.twimg.com/media/D8dDZukXUAAXLdY.jpg"
                        sx={{
                          height: "1rem",
                          width: "1rem",
                          fontSize: "8px",
                        }}
                      />
                      <Avatar
                        // src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
                        sx={{
                          height: "1rem",
                          width: "1rem",
                          fontSize: "8px",
                        }}
                      />
                    </AvatarGroup>
                    <Typography variant="body2" color="text.disabled">
                      {group.followers} Follower
                      {group.followers !== 1 && <span>s</span>}
                    </Typography>
                  </Box>
                </Grid>
                <Divider sx={{ margin: "1rem 0 .5rem" }} />
                <Link
                  sx={{
                    color: "inherit",
                    "&:hover": { color: theme.palette.secondary.main },
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
                      {currentUser?.followedGroups.includes(group._id) ? (
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
      </Container>
    </Box>
  );
};

export default Groups;
