import {
  Avatar,
  Box,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import { logout } from "../../redux/userSlice";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import serverUrl from "../../utils/serverUrl";

const NavUser = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signout = async () => {
    try {
      await axios.post(
        `${serverUrl}/auth/signout`,
        {},
        { withCredentials: true }
      );
      dispatch(logout());
      Navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Avatar
        sx={{ cursor: "pointer" }}
        onClick={handleClick}
        src={currentUser.avatar}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={handleClose}
          component={Link}
          to={`/profile/${currentUser._id}`}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          component={Link}
          to={`/settings/profile`}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <MenuItem onClick={signout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default NavUser;
