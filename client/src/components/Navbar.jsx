import styled from "@emotion/styled";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Link,
  TextField,
  InputAdornment,
  Toolbar,
  Typography,
  Grid,
  Button,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import GridViewIcon from "@mui/icons-material/GridView";
import React from "react";
import logo from "../images/sportify-icon-square.svg";
import theme from "../theme";
import { useSelector } from "react-redux";
import NavUser from "./NavUser";
import Notifications from "./Notifications";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);

  console.log(currentUser);

  return (
    <>
      <AppBar sx={{ backgroundColor: theme.palette.secondary.main }}>
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={4}>
              <Link
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".75rem",
                  width: "max-content",
                }}
                component={RouterLink}
                to="/"
              >
                <img
                  style={{ height: "26px", width: "26px" }}
                  alt=""
                  src={logo}
                />
                <Typography
                  color="#fff"
                  variant="h5"
                  sx={{ fontWeight: "500" }}
                >
                  Sportify
                </Typography>
              </Link>
            </Grid>

            <Grid item xs={4}>
              <TextField
                fullWidth
                sx={{
                  backgroundColor: "rgb(255 255 255 / 15%)",
                  borderRadius: "5px",
                }}
                size="small"
                placeholder="Search Sportify"
                inputProps={{
                  style: {
                    color: "#FFF",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#fff" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={4}>
              {currentUser ? (
                <>
                  <Grid
                    container
                    alignItems="center"
                    sx={{ gap: "1rem" }}
                    justifyContent="flex-end"
                  >
                    <Notifications />
                    <Tooltip title="Groups">
                      <Link component={RouterLink} to="/groups">
                        <GridViewIcon
                          sx={{
                            color: "#FFF",
                            "&:hover": { color: theme.palette.primary.main },
                            transition: ".3s ease all",
                          }}
                        />
                      </Link>
                    </Tooltip>
                    <Tooltip title="Games">
                      <Link
                        component={RouterLink}
                        to={`user/${currentUser._id}/games`}
                      >
                        <VideogameAssetIcon
                          sx={{
                            color: "#FFF",
                            "&:hover": { color: theme.palette.primary.main },
                            transition: ".3s ease all",
                          }}
                        />
                      </Link>
                    </Tooltip>
                    <Button
                      sx={{ margin: "0 .5rem" }}
                      variant="contained"
                      color="primary"
                    >
                      <AddIcon />
                      Create
                    </Button>
                    <NavUser />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid
                    container
                    sx={{ gap: ".5rem" }}
                    justifyContent="flex-end"
                  >
                    <Button
                      component={RouterLink}
                      to="/register"
                      color="white"
                      variant="outlined"
                    >
                      Register
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/login"
                      color="primary"
                      variant="contained"
                    >
                      Login
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default Navbar;
