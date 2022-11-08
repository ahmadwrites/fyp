import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { Chip, Divider, Grid, Typography } from "@mui/material";
import UserCard from "../../components/game/UserCard";

const Pending = ({ post, acceptUser, declineUser }) => {
  const { currentUser } = useSelector((state) => state.user);

  if (post && currentUser._id !== post?.userId) {
    return <Navigate to={`/games/${post?._id}/overview`} />;
  }

  return (
    <Box sx={{ marginTop: "1rem" }}>
      <Grid container alignItems="center" sx={{ gap: "1rem" }}>
        <Typography color="secondary" variant="h6" sx={{ fontWeight: "600" }}>
          PENDING
        </Typography>
        <Chip
          label={`${post?.pendingUsers.length} User${
            post?.pendingUsers.length !== 1 ? "s" : ""
          }`}
          size="small"
        />
      </Grid>
      <Divider sx={{ margin: ".5rem 0" }} />
      <Grid container spacing={2}>
        {post?.pendingUsers.map((pendingUser) => (
          <Grid key={pendingUser} item xs={6} md={2.5}>
            <UserCard
              declineUser={declineUser}
              type="pending"
              acceptUser={acceptUser}
              userId={pendingUser}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Pending;
