import React, { useState } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Box } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Badge,
  Button,
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
import theme from "../theme";

const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Badge badgeContent={2} color="error">
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
          <MenuList>
            <MenuItem>
              <ListItemIcon sx={{ marginRight: ".5rem" }}>
                <Avatar
                  sx={{
                    height: "2rem",
                    width: "2rem",
                    backgroundColor: theme.palette.error.light,
                  }}
                >
                  <WhatshotIcon />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary="Game Matched!"
                secondary="John has accepted your request."
              />
            </MenuItem>
            <MenuItem>
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
            </MenuItem>
          </MenuList>
        </Paper>
      </Menu>
    </Box>
  );
};

export default Notifications;
