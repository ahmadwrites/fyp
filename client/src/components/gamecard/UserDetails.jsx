import React, { useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Popover,
  Typography,
} from "@mui/material";

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

const UserDetails = ({ user }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <Box>
      <Avatar
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        src={user?.avatar}
        sx={{ height: "2rem", width: "2rem" }}
      />
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Paper sx={{ padding: { xs: ".5rem", md: "1rem" }, width: 250 }}>
          <Typography variant="h6" color="text.primary">
            {user?.firstName + " " + user?.lastName}
          </Typography>
          <Divider sx={{ margin: "0 0 .5rem" }} />
          <Typography sx={{ fontWeight: 500 }} variant="body2">
            Age:{" "}
            <Typography component="span" variant="body2">
              21
            </Typography>
          </Typography>
          <Typography sx={{ fontWeight: 500 }} variant="body2">
            Gender:{" "}
            <Typography component="span" variant="body2">
              Male
            </Typography>
          </Typography>
          <Typography sx={{ fontWeight: 500 }} variant="body2">
            Nationality:{" "}
            <Typography component="span" variant="body2">
              Malaysian
            </Typography>
          </Typography>
        </Paper>
      </Popover>
    </Box>
  );
};

export default UserDetails;
