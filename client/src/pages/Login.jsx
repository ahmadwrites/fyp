import {
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, Navigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";
import { loginStart, loginSuccess, loginFailure } from "../redux/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [userForm, setUserForm] = useState({
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState({
    open: false,
    severity: null,
    message: null,
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ ...alert, open: false });
  };

  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const res = await axios.post("/auth/signin", userForm);
      dispatch(loginSuccess(res.data));
      setAlert({
        open: true,
        severity: "success",
        message: "Successfully logged in.",
      });
    } catch (error) {
      dispatch(loginFailure());
      setAlert({
        open: true,
        severity: "error",
        message: error.response.data.message,
      });
    }
  };

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <Grid
      container
      sx={{ padding: "2rem 1rem", height: "calc(100vh - 64px)" }}
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Container maxWidth="xs">
        <Paper elevation={1}>
          <Grid container sx={{ padding: "1rem" }} direction="column">
            <Typography
              color="text.primary"
              variant="h5"
              sx={{ fontWeight: "500", textAlign: "center" }}
            >
              Login
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
              sx={{ textAlign: "center" }}
            >
              Welcome back.
            </Typography>
            <Divider orientation="horizontal" sx={{ margin: "1rem" }} />
            <form onSubmit={handleSubmit}>
              <Grid container direction="column" sx={{ gap: "1rem" }}>
                <TextField
                  size="small"
                  onChange={handleChange}
                  name="username"
                  label="Username"
                />
                <TextField
                  size="small"
                  onChange={handleChange}
                  type="password"
                  name="password"
                  label="Password"
                />

                <Button
                  type="submit"
                  onClick={handleSubmit}
                  variant="contained"
                >
                  Login
                </Button>
                <Link
                  sx={{ textAlign: "center" }}
                  to="/register"
                  component={RouterLink}
                >
                  <Typography color="text.primary" varaint="h6">
                    Need an account?
                  </Typography>
                </Link>
              </Grid>
            </form>
          </Grid>
        </Paper>
      </Container>
      <CustomAlert
        open={alert.open}
        handleClose={handleClose}
        message={alert.message}
        severity={alert.severity}
      />
    </Grid>
  );
};

export default Login;
