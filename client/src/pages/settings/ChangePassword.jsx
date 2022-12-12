import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import CustomAlert from "../../components/feedback/CustomAlert";
import serverUrl from "../../utils/serverUrl";

const ChangePassword = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [passwordForm, setPasswordForm] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [alert, setAlert] = useState({
    open: false,
    severity: null,
    message: null,
  });

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ ...alert, open: false });
  };

  const handleChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${serverUrl}/auth/change-password`, passwordForm, {
        withCredentials: true,
      });
      setAlert({
        open: true,
        severity: "success",
        message: "Successfully changed password.",
      });
    } catch (error) {
      console.log(error);
      setAlert({
        open: true,
        severity: "error",
        message: error.response.data,
      });
    }
  };

  return (
    <Paper sx={{ padding: "1rem" }}>
      <Typography variant="h6">Change Password.</Typography>
      <Typography variant="body1" color="text.secondary">
        Change your password to a new one.
      </Typography>
      <Container
        maxWidth="sm"
        disableGutters
        sx={{ marginRight: "auto", marginLeft: "0" }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container sx={{ marginTop: "1rem" }} spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography>Old Password</Typography>
              <Typography variant="body2" color="text.secondary">
                Enter your current password to change it.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                type="password"
                label="Old Password"
                name="password"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>New Password</Typography>
              <Typography variant="body2" color="text.secondary">
                Choose a new strong password.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                type="password"
                label="New Password"
                name="newPassword"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>Confirm New Password</Typography>
              <Typography variant="body2" color="text.secondary">
                Confirm your new password
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                type="password"
                label="Confirm New Password"
                name="confirmNewPassword"
                onChange={handleChange}
              />
            </Grid>
            <Grid
              container
              justifyContent="flex-end"
              sx={{ gap: ".5rem", marginTop: "1rem" }}
            >
              <Button
                component={RouterLink}
                to={`/profile/${currentUser._id}`}
                color="inherit"
                variant="contained"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                color="primary"
                variant="contained"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
      <CustomAlert
        open={alert.open}
        handleClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />
    </Paper>
  );
};

export default ChangePassword;
