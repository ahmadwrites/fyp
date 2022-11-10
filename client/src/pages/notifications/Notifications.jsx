import {
  Avatar,
  Grid,
  ListItemIcon,
  ListItemText,
  Link,
  MenuItem,
  MenuList,
  Paper,
  Typography,
  Box,
  Container,
  Chip,
} from "@mui/material";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import theme from "../../theme";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React, { useCallback, useEffect, useState } from "react";
import { format } from "timeago.js";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [mode, setMode] = useState("all");

  const handleFilter = () => {
    if (mode === "unread") {
      setMode("all");
    } else {
      setMode("unread");
    }
  };

  const readNotification = async (notification) => {
    try {
      await axios.put(
        `/notifications/read/${notification._id}`,
        {},
        { withCredentials: true }
      );
      getNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  const getNotifications = useCallback(async () => {
    try {
      if (mode === "all") {
        const res = await axios.get(`/notifications/received`, {
          withCredentials: true,
        });
        setNotifications(res.data);
      } else {
        const res = await axios.get(`/notifications/received/false`, {
          withCredentials: true,
        });
        setNotifications(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [mode]);

  useEffect(() => {
    getNotifications();

    const timer = window.setInterval(() => {
      getNotifications();
    }, 5000);

    return () => {
      window.clearInterval(timer);
    };
  }, [getNotifications]);

  return (
    <Box sx={{ minHeight: "calc(100vh - 64px)" }}>
      <Container maxWidth="sm" sx={{ padding: { xs: ".5rem", md: "1rem" } }}>
        <Typography
          mb=".5rem"
          variant="h5"
          sx={{ fontWeight: 500 }}
          color="text.primary"
        >
          <Paper elevation={1}>
            <Grid container sx={{ padding: "1rem", gap: ".5rem" }}>
              <Grid container justifyContent="space-between">
                <Typography
                  color="text.primary"
                  variant="h5"
                  sx={{ fontWeight: "500", textAlign: "center" }}
                >
                  Notifications
                </Typography>
                <MoreHorizIcon
                  sx={{ color: "rgba(0, 0, 0, 0.6)", cursor: "pointer" }}
                />
              </Grid>
              <Grid container sx={{ gap: ".5rem" }}>
                <Chip
                  sx={{ cursor: "pointer" }}
                  label="All"
                  onClick={handleFilter}
                  variant={mode === "all" ? "filled" : "outlined"}
                />
                <Chip
                  sx={{ cursor: "pointer" }}
                  label="Unread"
                  onClick={handleFilter}
                  variant={mode === "unread" ? "filled" : "outlined"}
                />
              </Grid>
              <MenuList
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: ".5rem",
                }}
              >
                {notifications.length > 0 &&
                  notifications.map((notification) => (
                    <Box>
                      <MenuItem
                        sx={{ padding: ".5rem", width: "100%" }}
                        key={notification._id}
                        onClick={() => readNotification(notification)}
                      >
                        <ListItemIcon sx={{ marginRight: "1rem" }}>
                          <Avatar
                            component={RouterLink}
                            to={`/profile/${notification.senderId}`}
                            sx={{
                              height: "48px",
                              width: "48px",
                              backgroundColor:
                                notification?.type === "request"
                                  ? theme.palette.tertiary.main
                                  : notification?.type === "match"
                                  ? theme.palette.error.light
                                  : notification?.type === "completed"
                                  ? theme.palette.success.light
                                  : theme.palette.gold.main,
                            }}
                          >
                            {notification?.type === "request" ? (
                              <EmojiPeopleIcon fontSize="large" />
                            ) : notification?.type === "match" ? (
                              <WhatshotIcon fontSize="large" />
                            ) : notification?.type === "completed" ? (
                              <CheckCircleOutlineIcon fontSize="large" />
                            ) : (
                              <StarBorderIcon fontSize="large" />
                            )}
                          </Avatar>
                        </ListItemIcon>
                        <Link
                          component={RouterLink}
                          to={`/games/${notification.postId}/overview`}
                        >
                          <ListItemText
                            primary={notification?.title}
                            primaryTypographyProps={{
                              style: {
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                color: "#000",
                                fontWeight: !notification.read ? "500" : "400",
                              },
                            }}
                            secondaryTypographyProps={{
                              style: {
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontWeight: !notification.read ? "500" : "400",
                              },
                            }}
                            secondary={notification?.message}
                          />
                        </Link>
                        <Typography
                          color="text.secondary"
                          variant="caption"
                          sx={{
                            display: "flex",
                            alignSelf: "flex-start",
                            marginLeft: "auto",
                            fontWeight: !notification.read ? "500" : "400",
                          }}
                        >
                          {format(notification?.createdAt)}
                        </Typography>
                      </MenuItem>
                      {/* {notification?.type === "request" && (
                        <Grid
                          container
                          alignItems="center"
                          justifyContent="flex-end"
                          sx={{ gap: ".5rem" }}
                        >
                          <Button
                            size="small"
                            variant="contained"
                            color="inherit"
                          >
                            Reject
                          </Button>
                          <Button
                            onClick={() =>
                              handleAccept(
                                notification?.postId,
                                notification?.senderId
                              )
                            }
                            size="small"
                            variant="contained"
                            color="tertiary"
                          >
                            Accept
                          </Button>
                        </Grid>
                      )} */}
                    </Box>
                  ))}
                {notifications.length === 0 && (
                  <Typography sx={{ textAlign: "center", padding: "1rem" }}>
                    No new notifications.
                  </Typography>
                )}

                {/* <MenuItem>
              <ListItemIcon sx={{ marginRight: ".5rem" }}>
                <Avatar
                  sx={{
                    height: "2rem",
                    width: "2rem",
                    backgroundColor: theme.palette.tertiary.main,
                  }}
                >
                  <EmojiPeopleIcon />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary="Player Request!"
                secondary="Sara wants to join your game!"
              />
            </MenuItem> */}
              </MenuList>
            </Grid>
          </Paper>
        </Typography>
      </Container>
    </Box>
  );
};

export default Notifications;
