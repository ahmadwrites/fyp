import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  useMediaQuery,
  Paper,
  Select,
  Slider,
  Tooltip,
  Typography,
  Button,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";
import theme from "../../theme";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 30;

const marks = [
  {
    value: 0,
    label: "0km",
  },
  {
    value: 100,
    label: "100km",
  },
];

const Preferences = () => {
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const { currentUser } = useSelector((state) => state.user);
  const [preference, setPreference] = useState({
    maxDistance: 80,
    gender: "all",
  });

  useEffect(() => {
    const getPreference = async () => {
      try {
        const res = await axios.get("/preferences");
        if (res.data !== null) {
          setPreference(res.data);
          console.log(res.data);
        } else {
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };

    getPreference();
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await axios.get(`/preferences`);

      if (res.data === null) {
        await axios.post("/preferences", preference, {
          withCredentials: true,
        });
        // Todo: Change to toast
        alert("Saved successfully.");
      } else {
        await axios.put("/preferences", preference, {
          withCredentials: true,
        });
        alert("Updated successfully.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setPreference({ ...preference, [e.target.name]: e.target.value });
  };

  return (
    <Paper sx={{ padding: "1rem" }}>
      <Typography variant="h6">Preferences</Typography>
      <Typography variant="body1" color="text.secondary">
        Change your settings here to view games catered to your preferences.
      </Typography>

      <Container
        maxWidth="sm"
        disableGutters
        sx={{ marginRight: "auto", marginLeft: "0" }}
      >
        <Grid container sx={{ marginTop: "1rem" }} spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography>Distance (KM)</Typography>
            <Typography variant="body2" color="text.secondary">
              The distance of the games to you.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Tooltip
              arrow
              placement={isMatch ? "bottom" : "right"}
              title={
                currentUser.location
                  ? "Based on your current location provided in your profile settings."
                  : "Add your location in the profile settings first."
              }
            >
              <Box sx={{ width: { xs: "400px", md: "260px" } }}>
                <Slider
                  min={minDistance}
                  disabled={currentUser.location ? false : true}
                  getAriaLabel={() => "Minimum distance"}
                  value={preference?.maxDistance}
                  defaultValue={preference?.maxDistance}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  marks={marks}
                  name="maxDistance"
                  color="tertiary"
                  disableSwap
                />
              </Box>
            </Tooltip>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>Genders</Typography>
            <Typography variant="body2" color="text.secondary">
              Change your gender preferences.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                label="Gender"
                name="gender"
                value={preference?.gender}
                fullWidth
                onChange={handleChange}
                defaultValue="all"
                size="small"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="all">All</MenuItem>
              </Select>
            </FormControl>
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
            <Button onClick={handleSubmit} color="primary" variant="contained">
              Save
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default Preferences;
