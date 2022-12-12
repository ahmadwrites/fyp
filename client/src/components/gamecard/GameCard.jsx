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
import MapIcon from "@mui/icons-material/Map";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";
import GameCardMenu from "./GameCardMenu";
import RequestDialog from "../dialogs/RequestDialog";
import DeleteGameDialog from "../dialogs/DeleteGameDialog";
import CustomAlert from "../feedback/CustomAlert";
import CancelRequestDialog from "../dialogs/CancelRequestDialog";
import serverUrl from "../../utils/serverUrl";

const capitalize = (s) =>
  s?.charAt(0).toUpperCase() + s?.slice(1).toLowerCase();

const GameCard = ({ getPosts, post }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [group, setGroup] = useState(null);
  const [distance, setDistance] = useState(0);

  const [openRequest, setOpenRequest] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openCancelRequest, setOpenCancelRequest] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    severity: null,
    message: null,
  });

  const handleCloseModel = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ ...alert, open: false });
  };

  const handleRequest = async () => {
    try {
      await axios.post(
        `${serverUrl}/users/request/${post?._id}`,
        {},
        { withCredentials: true }
      );
      handleCloseRequest(true);
      getPosts();
      setAlert({
        open: true,
        severity: "success",
        message: "Request sent.",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelRequest = async () => {
    try {
      await axios.post(
        `${serverUrl}/users/unrequest/${post?._id}`,
        {},
        { withCredentials: true }
      );
      handleCloseCancelRequest(true);
      getPosts();
      setAlert({
        open: true,
        severity: "success",
        message: "Request cancelled successfully.",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${serverUrl}/posts/${post?._id}`, {
        withCredentials: true,
      });
      handleCloseDelete(true);
      getPosts();
      setAlert({
        open: true,
        severity: "success",
        message: "Game deleted successfully.",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOpenRequest = () => {
    setOpenRequest(true);
  };

  const handleCloseRequest = () => {
    setOpenRequest(false);
  };

  const handleClickOpenCancelRequest = () => {
    setOpenCancelRequest(true);
  };

  const handleCloseCancelRequest = () => {
    setOpenCancelRequest(false);
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const userRes = await axios.get(`${serverUrl}/users/${post?.userId}`);
        setUser(userRes.data);
        const groupRes = await axios.get(
          `${serverUrl}/groups/${post?.groupId}`
        );
        setGroup(groupRes.data);
        const averageRes = await axios.get(
          `${serverUrl}/ratings/user-received-average/${post?.userId}`
        );
        setAverageRating(averageRes.data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [post?.groupId, post?.userId]);

  useEffect(() => {
    const getDistance = async () => {
      try {
        if (!currentUser) {
          setDistance(0);
        } else {
          const res = await axios.post(
            `${serverUrl}/posts/distance`,
            {
              lat1: post?.latitude,
              long1: post?.longitude,
              lat2: currentUser?.latitude,
              long2: currentUser?.longitude,
            },
            { withCredentials: true }
          );
          setDistance(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getDistance();
  }, [
    currentUser,
    currentUser?.latitude,
    currentUser?.longitude,
    post?.latitude,
    post?.longitude,
  ]);

  return (
    <Paper
      sx={{
        padding: { xs: ".5rem", md: "1rem" },
        gap: { xs: ".5rem" },
        width: "100%",
      }}
    >
      <Grid container direction="column" sx={{ gap: ".5rem", height: "100%" }}>
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
            {post?.title}
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
          component={RouterLink}
          to={`/games/${post?._id}/overview`}
          sx={{
            height: "200px",
            width: "100%",
            alignSelf: "center",
            margin: ".5rem 0",
          }}
          src={post?.image}
          variant="rounded"
        />

        <Grid container sx={{ padding: ".5rem" }}>
          <Grid container alignItems="center" justifyContent="space-between">
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
                src={user?.avatar}
                sx={{ height: "42px", width: "42px" }}
              />
              {/* <UserDetails user={user} /> */}

              <Tooltip title="Average User Rating" arrow>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {" "}
                  <Typography variant="text.primary">
                    {user?.username}
                  </Typography>
                  <Rating
                    size="small"
                    value={averageRating}
                    readOnly
                    precision={0.5}
                  />
                </Box>
              </Tooltip>
            </Grid>

            <Tooltip
              title={<Typography variant="body2">{post?.location}</Typography>}
              arrow
            >
              <Typography variant="body2" color="text.primary">
                {/* Todo: Change distance  */}
                {currentUser?.location ? (
                  `${Math.round(distance)}km`
                ) : (
                  <>
                    {currentUser ? (
                      <Typography
                        color="text.primary"
                        component={RouterLink}
                        to={`/settings/profile`}
                      >
                        <MapIcon sx={{ color: "inherit" }} fontSize="small" />
                      </Typography>
                    ) : (
                      <Typography
                        color="text.primary"
                        component={RouterLink}
                        to={`/login`}
                      >
                        <MapIcon sx={{ color: "inherit" }} fontSize="small" />
                      </Typography>
                    )}
                  </>
                )}
              </Typography>
            </Tooltip>
          </Grid>
          <Grid container></Grid>
        </Grid>

        {/* <Divider />

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
            {post?.location}
          </Typography>
        </Box> */}

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
              {post?.price === 0 ? "FREE" : `RM${post?.price}`}
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
              {moment(post?.startTime).format("HH:mm")} -{" "}
              {moment(post?.endTime).format("HH:mm")}
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

        {currentUser?._id === post?.userId ? (
          <>
            <Button
              onClick={handleClickOpenDelete}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </>
        ) : (
          <>
            {currentUser ? (
              <>
                {post?.pendingUsers.includes(currentUser._id) ? (
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={handleClickOpenCancelRequest}
                  >
                    Cancel Request
                  </Button>
                ) : post?.isMatched.includes(currentUser._id) ? (
                  <Button
                    component={RouterLink}
                    to={`/games/${post?._id}/overview`}
                    variant="contained"
                    color="success"
                  >
                    Enter Game
                  </Button>
                ) : !post?.joinable ? (
                  <Button
                    component={RouterLink}
                    to={`/games/${post?._id}/overview`}
                    variant="contained"
                    disabled
                  >
                    Not Joinable
                  </Button>
                ) : (
                  <Button
                    onClick={handleClickOpenRequest}
                    variant="contained"
                    color="tertiary"
                  >
                    Request
                  </Button>
                )}
              </>
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
      <RequestDialog
        open={openRequest}
        handleClose={handleCloseRequest}
        post={post}
        handleRequest={handleRequest}
      />
      <CancelRequestDialog
        open={openCancelRequest}
        handleClose={handleCloseCancelRequest}
        post={post}
        handleRequest={handleCancelRequest}
      />
      <DeleteGameDialog
        open={openDelete}
        handleClose={handleCloseDelete}
        handleDelete={handleDelete}
        post={post}
      />
      <CustomAlert
        open={alert.open}
        handleClose={handleCloseModel}
        message={alert.message}
        severity={alert.severity}
      />
    </Paper>
  );
};

export default GameCard;
