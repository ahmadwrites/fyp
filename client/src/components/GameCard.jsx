import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Paper,
  Chip,
  Button,
  Divider,
  Rating,
  Tooltip,
} from "@mui/material";
import ExtensionOutlinedIcon from "@mui/icons-material/ExtensionOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";
import GameCardMenu from "./GameCardMenu";
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

const GameCard = ({ post }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState(null);
  const [group, setGroup] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const userRes = await axios.get(`/users/${post.userId}`);
        setUser(userRes.data);
        const groupRes = await axios.get(`/groups/${post.groupId}`);
        setGroup(groupRes.data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  });

  return (
    <Grid sx={{ display: "flex" }} item xs={12} sm={6}>
      <Paper
        sx={{
          padding: { xs: ".5rem", md: "1rem" },
          gap: { xs: ".5rem" },
          width: "100%",
        }}
      >
        <Grid
          container
          direction="column"
          sx={{ gap: ".5rem", height: "100%" }}
        >
          <Grid container alignItems="center" justifyContent="space-between">
            <Typography
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: { xs: "250px", md: "200px" },
              }}
              variant="h6"
            >
              {post.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Chip
                component={RouterLink}
                sx={{
                  color: "inherit",
                  cursor: "pointer",
                  marginRight: ".5rem",
                }}
                to={`/groups/${group?.title}`}
                label={group?.title}
              />
              <GameCardMenu post={post} />
            </Box>
          </Grid>

          <Avatar
            sx={{
              height: "200px",
              width: "100%",
              alignSelf: "center",
              margin: ".5rem 0",
            }}
            src={post.image}
            variant="rounded"
          />

          <Grid container sx={{ padding: ".5rem" }}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid
                item
                component={RouterLink}
                to={`/profile/${post.userId}`}
                sx={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <Avatar
                  src={user?.avatar}
                  sx={{ height: "2rem", width: "2rem" }}
                />
                {/* <UserDetails user={user} /> */}
                <Typography variant="text.primary">{user?.username}</Typography>
              </Grid>
              <Tooltip title="Average User Rating" arrow>
                <Box>
                  <Rating name="rating" value={3} readOnly />
                </Box>
              </Tooltip>
            </Grid>
            <Grid container></Grid>
          </Grid>

          <Divider />

          <Box sx={{ padding: ".5rem" }}>
            <Typography
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
              }}
              varaint="body1"
              color="text.secondary"
            >
              {post.location}
            </Typography>
          </Box>

          <Divider />

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
                {!post.venueId && "Free"}
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
                {capitalize(post.gender)}
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
                {post.level === 0
                  ? "Any"
                  : post.level === 1
                  ? "Novice"
                  : post.level === 2
                  ? "Beginner"
                  : post.level === 3
                  ? "Intermediate"
                  : post.level === 4
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
                {moment(post.startTime).format("h:mm")}-
                {moment(post.endTime).format("h:mm")}
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
                {moment(post.date).format("DD-MM-yyyy")}
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
                {post.isMatched.length + 1} / {post?.noOfPeople}
              </Typography>
            </Grid>
          </Grid>

          {currentUser?._id === post.userId ? (
            <>
              <Button variant="contained" color="error">
                Delete
              </Button>
            </>
          ) : (
            <>
              {currentUser ? (
                <Button variant="contained" color="tertiary">
                  Request
                </Button>
              ) : (
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="contained"
                  color="tertiary"
                >
                  Request
                </Button>
              )}
            </>
          )}
        </Grid>
      </Paper>
    </Grid>
  );
};

export default GameCard;
