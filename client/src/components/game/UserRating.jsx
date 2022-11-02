import { Avatar, Box, Grid, Rating, Tooltip, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

const UserRating = ({ matchedUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/users/${matchedUser}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [matchedUser]);

  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid
        item
        component={RouterLink}
        to={`/profile/${user?._id}`}
        sx={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        <Avatar src={user?.avatar} sx={{ height: "48px", width: "48px" }} />
        {/* <UserDetails user={user} /> */}
        <Typography variant="text.primary">{user?.username}</Typography>
      </Grid>
      <Tooltip title="Average User Rating" arrow>
        <Box>
          <Rating name="rating" value={3} readOnly />
        </Box>
      </Tooltip>
    </Grid>
  );
};

export default UserRating;
