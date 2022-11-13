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
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Review from "../../components/profile/Review";

const ProfileReviews = ({ ratings, setRatingsSort }) => {
  return (
    <Paper sx={{ padding: { xs: ".5rem", md: "1rem" } }}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Typography variant="h6">Reviews</Typography>
        <FormControl sx={{ width: "150px" }} size="small">
          <InputLabel id="sort-select-label">Sort By</InputLabel>
          <Select
            onChange={(e) => setRatingsSort(e.target.value)}
            defaultValue={-1}
            labelId="sort-select-label"
            id="sort-select"
            label="Sort By"
          >
            <MenuItem value={-1}>Newest</MenuItem>
            <MenuItem value={1}>Oldest</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Divider sx={{ margin: ".5rem 0" }} />

      {ratings.length === 0 ? (
        <>
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
              No Reviews Yet
            </Typography>
          </Grid>{" "}
        </>
      ) : (
        <>
          {ratings.map((rating) => (
            <Review key={rating?._id} rating={rating} />
          ))}
        </>
      )}
    </Paper>
  );
};

export default ProfileReviews;
