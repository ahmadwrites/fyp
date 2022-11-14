import { Box, Container, Typography, Paper, Grid, Chip } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ListingCard from "../../components/profile/ListingCard";

const Games = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [completed, setIsCompleted] = useState(false);

  const handleFilter = () => {
    setIsCompleted((prev) => !prev);
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const postRes = await axios.get(
          `/posts/with-user/${currentUser._id}?isCompleted=${completed}`
        );
        setPosts(postRes.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPosts();
  }, [currentUser._id, completed]);

  return (
    <Box sx={{ minHeight: "calc(100vh - 64px)" }}>
      <Container maxWidth="md" sx={{ padding: { xs: ".5rem", md: "1rem" } }}>
        <Paper elevation={1} sx={{ padding: "1rem" }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 500, marginBottom: ".5rem" }}
            color="text.primary"
          >
            Games
          </Typography>
          <Grid
            sx={{
              gap: ".5rem",
              marginBottom: "1rem",
            }}
            container
            alignItems="center"
          >
            <Chip
              sx={{
                cursor: "pointer",
                color: completed === false ? "#fff" : "inherit",
              }}
              label="Ongoing"
              onClick={handleFilter}
              color={completed === false ? "primary" : "default"}
              variant={completed === false ? "filled" : "outlined"}
            />
            <Chip
              sx={{
                cursor: "pointer",
                color: completed === true ? "#fff" : "inherit",
              }}
              label="Completed"
              onClick={handleFilter}
              color={completed === true ? "primary" : "default"}
              variant={completed === true ? "filled" : "outlined"}
            />
          </Grid>
          {posts.length === 0 ? (
            <>
              <Grid container justifyContent="center">
                <Typography
                  sx={{ textAlign: "center" }}
                  variant="h6"
                  color="text.secondary"
                >
                  No Ongoing Games
                </Typography>
              </Grid>
            </>
          ) : (
            <>
              <Grid container spacing={2}>
                {posts.map((post) => (
                  <Grid key={post?._id} item xs={12} md={6}>
                    <ListingCard post={post} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Games;
