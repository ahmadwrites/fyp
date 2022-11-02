import {
  Avatar,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import ExtensionOutlinedIcon from "@mui/icons-material/ExtensionOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import GameCardMenu from "../../components/gamecard/GameCardMenu";
import UserRating from "../../components/game/UserRating";

const capitalize = (s) =>
  s?.charAt(0).toUpperCase() + s?.slice(1).toLowerCase();

const Game = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation().pathname.split("/")[2];
  const [post, setPost] = useState(null);
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      try {
        const postRes = await axios.get(`/posts/${location}`);
        setPost(postRes.data);

        const userRes = await axios.get(`/users/${post?.userId}`);
        setCreator(userRes.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getPost();
  }, [location, post?.userId]);

  if (loading)
    return (
      <>
        <Box sx={{ minHeight: "calc(100vh - 64px)" }}>Loading...</Box>
      </>
    );

  return (
    <Box sx={{ minHeight: "calc(100vh - 64px)" }}>
      <Container maxWidth="lg" sx={{ padding: { xs: ".5rem", md: "1rem" } }}>
        <Grid
          container
          spacing={{ xs: 1, md: 3 }}
          justifyContent="space-between"
        >
          <Grid item xs={12} md={8}>
            <Paper sx={{ padding: { xs: ".5rem", md: "1rem" } }}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  marginBottom: "1rem",
                }}
              >
                <Typography variant="h4">{post?.title}</Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Chip
                    component={RouterLink}
                    sx={{
                      color: "inherit",
                      cursor: "pointer",
                      marginRight: ".5rem",
                    }}
                    to={`/groups/`}
                    label={"Boxing"}
                  />
                  <GameCardMenu post={post} />
                </Box>
              </Grid>
              <Avatar
                variant="rounded"
                sx={{ height: "350px", width: "100%" }}
                src={post?.image}
              />
              <Typography
                variant="body1"
                sx={{ fontWeight: 500, marginTop: "1rem" }}
                color="error.light"
              >
                {moment(post?.date).format("dddd")},{" "}
                {moment(post?.date).format("DD MMMM yyyy")} from{" "}
                {moment(post?.startTime).format("h:mma")} -
                {moment(post?.endTime).format("h:mma")}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: 400 }}
                color="text.secondary"
              >
                {post?.location}
              </Typography>
              <Divider sx={{ margin: "1rem 0" }} />
              <Grid
                sx={{ padding: ".5rem 0", marginBottom: "auto" }}
                container
                columnSpacing={2}
                rowSpacing={3}
              >
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  item
                  xs={4}
                >
                  <PaidOutlinedIcon />
                  <Typography variant="body2" color="text.secondary">
                    {!post?.venueId && "Free"}
                  </Typography>
                </Grid>

                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  item
                  xs={4}
                >
                  <PersonOutlineIcon />
                  <Typography variant="body2" color="text.secondary">
                    {capitalize(post?.gender)}
                  </Typography>
                </Grid>

                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  item
                  xs={4}
                >
                  <ExtensionOutlinedIcon />
                  <Typography variant="body2" color="text.secondary">
                    {post?.level === 0
                      ? "Any"
                      : post?.level === 1
                      ? "Novice"
                      : post?.level === 2
                      ? "Beginner"
                      : post?.level === 3
                      ? "Intermediate"
                      : post?.level === 4
                      ? "Advanced"
                      : "Professional"}
                  </Typography>
                </Grid>

                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  item
                  xs={4}
                >
                  <AccessTimeIcon />
                  <Typography variant="body2" color="text.secondary">
                    {moment(post?.startTime).format("h:mma")} -
                    {moment(post?.endTime).format("h:mma")}
                  </Typography>
                </Grid>

                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  item
                  xs={4}
                >
                  <CalendarMonthIcon />
                  <Typography variant="body2" color="text.secondary">
                    {moment(post?.date).format("DD-MM-yyyy")}
                  </Typography>
                </Grid>

                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  item
                  xs={4}
                >
                  <PeopleOutlineIcon />
                  <Typography variant="body2" color="text.secondary">
                    {post?.isMatched.length + 1} / {post?.noOfPeople}
                  </Typography>
                </Grid>
              </Grid>
              <Button
                sx={{ marginTop: "1rem" }}
                size="large"
                color="error"
                fullWidth
                variant="contained"
              >
                Delete
              </Button>
            </Paper>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Paper sx={{ padding: { xs: ".5rem", md: "1rem" } }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "500" }}
                color="text.primary"
                mb={1}
              >
                Game Creator
              </Typography>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid
                  item
                  component={RouterLink}
                  to={`/profile/${post?.userId}`}
                  sx={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <Avatar
                    src={creator?.avatar}
                    sx={{ height: "48px", width: "48px" }}
                  />
                  {/* <UserDetails user={user} /> */}
                  <Typography variant="text.primary">
                    {creator?.username}
                  </Typography>
                </Grid>
                <Tooltip title="Average User Rating" arrow>
                  <Box>
                    <Rating name="rating" value={3} readOnly />
                  </Box>
                </Tooltip>
              </Grid>
            </Paper>

            {post?.isMatched.length > 0 && (
              <Paper sx={{ padding: { xs: ".5rem", md: "1rem" } }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "500" }}
                  color="text.primary"
                  mb={1}
                >
                  Matched Users
                </Typography>
                {post?.isMatched.map((matchedUser) => (
                  <UserRating key={matchedUser} matchedUser={matchedUser} />
                ))}
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Game;
