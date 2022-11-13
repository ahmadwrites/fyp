import {
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import React from "react";

const ProfileListings = () => {
  return (
    <Paper sx={{ padding: { xs: ".5rem", md: "1rem" } }}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Typography variant="h6">Game Listings</Typography>
        <FormControl sx={{ width: "150px" }} size="small">
          <InputLabel id="sort-select-label">Sort By</InputLabel>
          <Select
            defaultValue="newest"
            labelId="sort-select-label"
            id="sort-select"
            label="Sort By"
          >
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Divider sx={{ margin: ".5rem 0" }} />
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ textAlign: "center" }}
      >
        <Typography
          variant="h6"
          sx={{ margin: "1rem 0" }}
          color="text.secondary"
        >
          No Lisitngs Yet
        </Typography>
      </Grid>
    </Paper>
  );
};

export default ProfileListings;
