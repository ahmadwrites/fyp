import React from "react";
import { Box } from "@mui/system";
import { Chip, Divider, Grid, Typography } from "@mui/material";
import UserCard from "../../components/game/UserCard";

const Participants = ({ post, getPost }) => {
  return (
    <Box sx={{ marginTop: "1rem" }}>
      <Grid container alignItems="center" sx={{ gap: "1rem" }}>
        <Typography color="secondary" variant="h6" sx={{ fontWeight: "600" }}>
          PARTICIPANTS
        </Typography>
        <Chip
          label={`${post?.isMatched.length + 1} User${
            post?.isMatched.length + 1 !== 1 ? "s" : ""
          }`}
          size="small"
        />
      </Grid>
      <Divider sx={{ margin: ".5rem 0" }} />
      <Grid container spacing={2}>
        <Grid item xs={6} md={2.5}>
          {post && <UserCard post={post} creator userId={post?.userId} />}
        </Grid>
        {post?.isMatched.map((isMatched) => (
          <Grid key={isMatched} item xs={6} md={2.5}>
            <UserCard getPost={getPost} post={post} userId={isMatched} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Participants;
