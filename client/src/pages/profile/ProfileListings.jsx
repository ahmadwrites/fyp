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
import ListingCard from "../../components/profile/ListingCard";

const ProfileListings = ({ posts, setPostsSort }) => {
  return (
    <Paper sx={{ padding: { xs: ".5rem", md: "1rem" } }}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Typography variant="h6">Game Listings</Typography>
        <FormControl sx={{ width: "150px" }} size="small">
          <InputLabel id="sort-select-label">Sort By</InputLabel>
          <Select
            onChange={(e) => setPostsSort(e.target.value)}
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
      {posts.length === 0 ? (
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
              No Lisitngs Yet
            </Typography>
          </Grid>
        </>
      ) : (
        <>
          <Grid container spacing={2}>
            {posts?.map((post) => (
              <Grid item xs={12} md={6} key={post?._id}>
                <ListingCard post={post} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Paper>
  );
};

export default ProfileListings;
