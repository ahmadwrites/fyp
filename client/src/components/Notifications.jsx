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
import theme from "../theme";
import axios from "axios";

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

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const res = await axios.get("/notifications/received?limit=6");
        setNotifications(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getNotifications();

    const timer = window.setInterval(() => {
      getNotifications();
    }, 5000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

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
                <MenuItem key={notification._id}>
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
                        <EmojiPeopleIcon />
                      ) : notification?.type === "match" ? (
                        <WhatshotIcon />
                      ) : notification?.type === "completed" ? (
                        <CheckCircleOutlineIcon />
                      ) : (
                        <StarBorderIcon />
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
