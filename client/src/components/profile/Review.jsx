import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { format } from "timeago.js";

const Review = ({ rating }) => {
  const [user, setUser] = useState();
  const [post, setPost] = useState();
  const [group, setGroup] = useState();

  useEffect(() => {
    const getDetails = async () => {
      try {
        const userRes = await axios.get(`/users/${rating?.raterId}`);
        setUser(userRes.data);

        const postRes = await axios.get(`/posts/${rating?.postId}`);
        setPost(postRes.data);

        const groupRes = await axios.get(`/groups/${postRes?.data.groupId}`);
        setGroup(groupRes.data);
      } catch (error) {
        console.log(error);
      }
    };

    getDetails();
  }, [rating?.postId, rating?.raterId]);

  return (
    <Box sx={{ margin: "1rem 0" }}>
      <Grid
        container
        alignItems="center"
        spacing={2}
        sx={{ marginBottom: ".5rem" }}
      >
        <Grid item>
          <Avatar
            component={RouterLink}
            to={`/profile/${user?._id}`}
            src={user?.avatar}
          />
        </Grid>
        <Grid
          component={RouterLink}
          to={`/profile/${user?._id}`}
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Typography color="secondary">
            {user?.username} ∙ {format(rating?.createdAt)}
          </Typography>
          <Rating value={rating?.overallRating} readOnly size="small" />
        </Grid>
      </Grid>
      <Typography mb={1} color="text.primary">
        {rating?.desc}
      </Typography>
      <Grid
        component={RouterLink}
        to={`/games/${post?._id}/overview`}
        container
        sx={{
          padding: ".5rem",
          background: "rgba(12, 35, 64, .05)",
          borderRadius: "4px",
          textDecoration: "none",
          color: "inherit",
          gap: ".5rem",
          transition: ".3s ease all",
          boxShadow:
            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;",
        }}
      >
        <Grid item>
          <Avatar
            src={post?.image}
            variant="rounded"
            sx={{ height: "3rem", width: "3rem" }}
          />
        </Grid>
        <Grid item>
          <Typography variant="body1">{post?.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {group?.title}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Review;
