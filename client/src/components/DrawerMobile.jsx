import React, { useState } from "react";
import {
  Avatar,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  Link,
  ListItemText,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import MapIcon from "@mui/icons-material/Map";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import GridViewIcon from "@mui/icons-material/GridView";
import logo from "../images/sportify-icon-square.svg";
import theme from "../theme";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";
import { logout } from "../redux/userSlice";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const DrawerMobile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [openDrawer, setOpenDrawer] = useState(false);

  const signout = async () => {
    try {
      setOpenDrawer(false);
      await axios.post("/auth/signout", {}, { withCredentials: true });
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            minHeight: "40px",
            padding: ".5rem 1rem",
            gap: "1rem",
          }}
        >
          <img style={{ height: "26px", width: "26px" }} alt="" src={logo} />
          <Divider orientation="vertical" />
          <Grid container direction="column">
            <Typography sx={{ fontWeight: 600 }} color="primary.main">
              Sportify
            </Typography>
            <Typography variant="caption" color="text.primary">
              Version 1.0
            </Typography>
          </Grid>
        </Box>
        <Divider />
        <List sx={{ minWidth: 230 }}>
          <Typography
            ml={2}
            variant="body1"
            sx={{ fontWeight: 500 }}
            color="secondary.main"
          >
            Navigation
          </Typography>
          <ListItemButton
            component={RouterLink}
            to="/"
            onClick={() => setOpenDrawer(false)}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItemButton>
          <ListItemButton
            component={RouterLink}
            to="/groups"
            onClick={() => setOpenDrawer(false)}
          >
            <ListItemIcon>
              <GridViewIcon />
            </ListItemIcon>
            <ListItemText>Groups</ListItemText>
          </ListItemButton>

          <ListItemButton
            component={RouterLink}
            to="/explore"
            onClick={() => setOpenDrawer(false)}
          >
            <ListItemIcon>
              <MapIcon />
            </ListItemIcon>
            <ListItemText>Explore</ListItemText>
          </ListItemButton>

          <ListItemButton
            component={RouterLink}
            to="/games"
            onClick={() => setOpenDrawer(false)}
          >
            <ListItemIcon>
              <VideogameAssetIcon />
            </ListItemIcon>
            <ListItemText>Games</ListItemText>
          </ListItemButton>
          {currentUser && (
            <ListItemButton
              component={RouterLink}
              to="/games/create"
              onClick={() => setOpenDrawer(false)}
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText>Create</ListItemText>
            </ListItemButton>
          )}
          <Divider />
          <Typography
            ml={2}
            mt=".5rem"
            variant="body1"
            sx={{ fontWeight: 500 }}
            color="secondary.main"
          >
            Personal
          </Typography>
          {currentUser ? (
            <>
              <ListItemButton
                to={`/profile/${currentUser._id}`}
                component={RouterLink}
                onClick={() => setOpenDrawer(false)}
              >
                <ListItemIcon>
                  <Avatar
                    src={currentUser?.avatar}
                    sx={{ height: "1.5rem", width: "1.5rem" }}
                  />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </ListItemButton>
              <ListItemButton
                to="/settings/profile"
                component={RouterLink}
                onClick={() => setOpenDrawer(false)}
              >
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText>Settings</ListItemText>
              </ListItemButton>
              <ListItemButton onClick={signout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </ListItemButton>
            </>
          ) : (
            <>
              <ListItemButton
                to="/login"
                component={RouterLink}
                onClick={() => setOpenDrawer(false)}
              >
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText>Login</ListItemText>
              </ListItemButton>
              <ListItemButton
                to="/register"
                component={RouterLink}
                onClick={() => setOpenDrawer(false)}
              >
                <ListItemIcon>
                  <PersonAddAltIcon />
                </ListItemIcon>
                <ListItemText>Register</ListItemText>
              </ListItemButton>
            </>
          )}
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "#FFF" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default DrawerMobile;
