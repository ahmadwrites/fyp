import React, { useState, useEffect } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Box } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Badge,
  Button,
  Divider,
  Grid,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import theme from "../../theme";
import axios from "axios";
import { format } from "timeago.js";
import { useCallback } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const readNotification = async (notification) => {
    try {
      await axios.put(
        `/notifications/read/${notification._id}`,
        {},
        { withCredentials: true }
      );
      getNotifications();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const getNotifications = useCallback(async () => {
    try {
      const res = await axios.get("/notifications/received?limit=6", {
        withCredentials: true,
      });
      setNotifications(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

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
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Badge
        max={5}
        badgeContent={
          notifications.filter((notification) => notification.read !== true)
            .length
        }
        color="error"
      >
        <NotificationsNoneIcon
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{
            color: "#FFF",
            cursor: "pointer",
            "&:hover": { color: theme.palette.primary.main },
            transition: ".3s ease all",
          }}
        />
      </Badge>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Paper
          elevation={0}
          sx={{ width: { xs: 280, md: 320 }, maxWidth: "100%" }}
        >
          <Grid
            container
            sx={{ padding: "0 1rem" }}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "500" }}
              color="text.primary"
            >
              Notifications
            </Typography>
            <Button
              size="small"
              color="tertiary"
              onClick={handleClose}
              component={RouterLink}
              to="/notifications"
            >
              Show All
            </Button>
          </Grid>
          <Divider />
          <MenuList>
            {notifications.length > 0 &&
              notifications.map((notification) => (
                <MenuItem
                  component={RouterLink}
                  to={`/games/${notification.postId}/overview`}
                  key={notification._id}
                  onClick={() => readNotification(notification)}
                >
                  <ListItemIcon sx={{ marginRight: ".5rem" }}>
                    <Avatar
                      sx={{
                        height: "2rem",
                        width: "2rem",
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
                        <EmojiPeopleIcon fontSize="small" />
                      ) : notification?.type === "match" ? (
                        <WhatshotIcon fontSize="small" />
                      ) : notification?.type === "completed" ? (
                        <CheckCircleOutlineIcon fontSize="small" />
                      ) : (
                        <StarBorderIcon fontSize="small" />
                      )}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={notification?.title}
                    primaryTypographyProps={{
                      style: {
                        overflow: "hidden",
                        textOverflow: "ellipsis",
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
                  <Typography
                    color="text.secondary"
                    variant="caption"
                    sx={{
                      display: "flex",
                      alignSelf: "flex-start",
                      fontWeight: !notification.read ? "500" : "400",
                    }}
                  >
                    {format(notification?.createdAt)}
                  </Typography>
                </MenuItem>
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
        </Paper>
      </Menu>
    </Box>
  );
};

export default Notifications;
