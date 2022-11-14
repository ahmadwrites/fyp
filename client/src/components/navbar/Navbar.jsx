import styled from "@emotion/styled";
import { Link as RouterLink, useNavigate } from "react-router-dom";
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
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import CloseIcon from "@mui/icons-material/Close";
import GridViewIcon from "@mui/icons-material/GridView";
import MapIcon from "@mui/icons-material/Map";
import React, { useState } from "react";
import logo from "../../images/sportify-icon-square.svg";
import theme from "../../theme";
import { useSelector } from "react-redux";
import NavUser from "./NavUser";
import Notifications from "./Notifications";
import DrawerMobile from "./DrawerMobile";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [search, setSearch] = useState("");

  const handleSubmit = () => {
    navigate(`/search?title=${search}`);
    setSearch("");
  };

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
                placeholder="Search"
                inputProps={{
                  style: {
                    color: "#FFF",
                  },
                }}
                value={search}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#fff" }} />
                    </InputAdornment>
                  ),
                  endAdornment: search !== "" && (
                    <InputAdornment position="end">
                      <CloseIcon
                        onClick={() => setSearch("")}
                        sx={{
                          color: "#fff",
                          cursor: "pointer",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={4}>
              {isMatch ? (
                <>
                  {currentUser ? (
                    <>
                      <Grid
                        container
                        alignItems="center"
                        sx={{ gap: ".5rem" }}
                        justifyContent="flex-end"
                      >
                        <Notifications />
                        <DrawerMobile />
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
                          size="small"
                          color="white"
                          variant="outlined"
                        >
                          Register
                        </Button>
                        <DrawerMobile />
                      </Grid>
                    </>
                  )}
                </>
              ) : (
                <>
                  {currentUser ? (
                    <>
                      <Grid
                        container
                        alignItems="center"
                        sx={{ gap: "1rem" }}
                        justifyContent="flex-end"
                      >
                        <Notifications />
                        <Tooltip arrow title="Groups">
                          <Link component={RouterLink} to="/groups">
                            <GridViewIcon
                              sx={{
                                color: "#FFF",
                                "&:hover": {
                                  color: theme.palette.primary.main,
                                },
                                transition: ".3s ease all",
                              }}
                            />
                          </Link>
                        </Tooltip>
                        <Tooltip arrow title="Explore">
                          <Link component={RouterLink} to="explore">
                            <MapIcon
                              sx={{
                                color: "#FFF",
                                "&:hover": {
                                  color: theme.palette.primary.main,
                                },
                                transition: ".3s ease all",
                              }}
                            />
                          </Link>
                        </Tooltip>
                        <Tooltip arrow title="Games">
                          <Link component={RouterLink} to={`/games`}>
                            <VideogameAssetIcon
                              sx={{
                                color: "#FFF",
                                "&:hover": {
                                  color: theme.palette.primary.main,
                                },
                                transition: ".3s ease all",
                              }}
                            />
                          </Link>
                        </Tooltip>
                        {/* <Tooltip title="Create Game">
                          <Link component={RouterLink} to={`Create`}>
                            <AddIcon
                              sx={{
                                color: "#FFF",
                                "&:hover": {
                                  color: theme.palette.primary.main,
                                },
                                transition: ".3s ease all",
                              }}
                            />
                          </Link>
                        </Tooltip>
                        <Button
                          sx={{ margin: "0 .5rem" }}
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          <AutoAwesomeIcon
                            fontSize="small"
                            sx={{ marginRight: ".5rem" }}
                          />
                          2 / 3
                        </Button> */}
                        <Button
                          component={RouterLink}
                          to="/games/create"
                          sx={{ margin: "0 .5rem" }}
                          variant="contained"
                          color="primary"
                        >
                          <AddIcon
                            fontSize="small"
                            sx={{ marginRight: ".5rem" }}
                          />
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
