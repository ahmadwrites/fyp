import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Link,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import CustomAlert from "../components/CustomAlert";
import MuiPhoneNumber from "material-ui-phone-number";
import { useSelector } from "react-redux";

const Register = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    type: "player",
  });

  const [alert, setAlert] = useState({
    open: false,
    severity: null,
    message: null,
  });

  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ ...alert, open: false });
  };

  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
    console.log(userForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userForm.password.length < 3) {
      setAlert({
        open: true,
        severity: "error",
        message: "Password must be more than 3 characters.",
      });
      return;
    }

    try {
      await axios.post("/auth/signup", userForm);
      setAlert({
        open: true,
        severity: "success",
        message: "Successfully created user.",
      });
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
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
      sx={{ padding: "2rem 1rem" }}
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Paper elevation={1}>
        <Grid container sx={{ padding: "1rem" }} direction="column">
          <Typography
            color="text.primary"
            variant="h5"
            sx={{ fontWeight: "500", textAlign: "center" }}
          >
            Create a new account
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
            sx={{ textAlign: "center" }}
          >
            It's quick & easy.
          </Typography>
          <Divider orientation="horizontal" sx={{ margin: "1rem" }} />
          <form onSubmit={handleSubmit}>
            <Grid container direction="column" sx={{ gap: "1rem" }}>
              <Grid
                container
                alignItems="center"
                sx={{ gap: "1rem" }}
                wrap="nowrap"
              >
                <Grid item xs={6}>
                  <TextField
                    onChange={handleChange}
                    name="firstName"
                    size="small"
                    label="First Name"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    onChange={handleChange}
                    name="lastName"
                    size="small"
                    label="Last Name"
                  />
                </Grid>
              </Grid>
              <TextField
                onChange={handleChange}
                name="username"
                size="small"
                label="Username"
              />
              <TextField
                onChange={handleChange}
                name="email"
                size="small"
                label="Email Address"
              />
              <TextField
                onChange={handleChange}
                name="password"
                type="password"
                size="small"
                label="Password"
              />
              <MuiPhoneNumber
                defaultCountry={"my"}
                variant="outlined"
                size="small"
                label="Phone Number"
                onChange={(value) =>
                  setUserForm({ ...userForm, phoneNumber: value })
                }
              />
              <TextField
                onChange={handleChange}
                name="dateOfBirth"
                size="small"
                type="date"
                label="Birthday"
                InputLabelProps={{ shrink: true }}
              />
              <FormControl fullWidth size="small">
                <InputLabel id="type-label">Type</InputLabel>
                <Select
                  onChange={handleChange}
                  labelId="type-label"
                  id="type"
                  label="type"
                  name="type"
                  value={userForm.type}
                >
                  <MenuItem value="player">Player</MenuItem>
                  <MenuItem value="merchant">Venue Merchant</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel id="gender-label">Gender</FormLabel>
                <RadioGroup
                  onChange={handleChange}
                  row
                  aria-labelledby="gender-label"
                  name="gender"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio size="small" />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio size="small" />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
              <Typography variant="body2" color="text.disabled">
                By registering, you accept the terms & conditions of Sportify.
              </Typography>
              <Button type="submit" onClick={handleSubmit} variant="contained">
                Sign Up
              </Button>
              <Link
                sx={{ textAlign: "center" }}
                to="/login"
                component={RouterLink}
              >
                <Typography color="text.primary" varaint="h6">
                  Already have an account?
                </Typography>
              </Link>
            </Grid>
          </form>
        </Grid>
      </Paper>
      <CustomAlert
        open={alert.open}
        handleClose={handleClose}
        message={alert.message}
        severity={alert.severity}
      />
    </Grid>
  );
};

export default Register;
