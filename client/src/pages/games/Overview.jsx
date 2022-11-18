import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import getAge from "../../utils/getAge";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import axios from "axios";

const capitalize = (s) =>
  s?.charAt(0).toUpperCase() + s?.slice(1).toLowerCase();

const Overview = ({ post, creator }) => {
  const [averageRating, setAverageRating] = useState(0);
  const postLocation = post?.location.replaceAll(" ", "+");

  const getRating = useCallback(async () => {
    try {
      const averageRes = await axios.get(
        `/ratings/user-received-average/${post?.userId}`
      );
      setAverageRating(averageRes.data);
    } catch (error) {
      console.log(error);
    }
  }, [post?.userId]);

  useEffect(() => {
    getRating();
  }, [getRating]);

  return (
    <Box sx={{ marginTop: "1rem" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Typography color="secondary" variant="h6" sx={{ fontWeight: "600" }}>
            GAME OVERVIEW
          </Typography>
          <Divider sx={{ margin: ".5rem 0" }} />
          <Paper sx={{ padding: "1rem", height: { xs: "auto", md: "100px" } }}>
            <Grid container rowSpacing={2}>
              <Grid item xs={4}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 500 }}
                  color="tertiary"
                >
                  Price
                </Typography>
                <Typography variant="body2">Free</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 500 }}
                  color="tertiary"
                >
                  Starts
                </Typography>
                <Typography variant="body2">
                  {moment(post?.startTime).format("HH:mm")},{" "}
                  {moment(post?.date).format("DD/MM/yyyy")}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 500 }}
                  color="tertiary"
                >
                  Ends
                </Typography>
                <Typography variant="body2">
                  {moment(post?.endTime).format("HH:mm")},{" "}
                  {moment(post?.date).format("DD/MM/yyyy")}
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 500 }}
                  color="tertiary"
                >
                  People
                </Typography>
                <Typography variant="body2">
                  {post?.isMatched.length + 1} / {post?.noOfPeople}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 500 }}
                  color="tertiary"
                >
                  Gender
                </Typography>
                <Typography variant="body2">
                  {capitalize(post?.gender)}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 500 }}
                  color="tertiary"
                >
                  Difficulty
                </Typography>
                <Typography variant="body2">
                  {post?.level === 0
                    ? "Any"
                    : post?.level === 1
                    ? "Novice"
                    : post?.level === 2
                    ? "Beginner"
                    : post?.level === 3
                    ? "Intermediate"
                    : post?.level === 4
                    ? "Advanced"
                    : "Professional"}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography color="secondary" variant="h6" sx={{ fontWeight: "600" }}>
            GAME ORGANIZER
          </Typography>
          <Divider sx={{ margin: ".5rem 0" }} />
          <Paper sx={{ padding: "1rem", height: { xs: "auto", md: "100px" } }}>
            <Grid container direction="row">
              <Avatar
                variant="rounded"
                src={creator?.avatar}
                sx={{
                  height: "6.5rem",
                  width: "6.5rem",
                }}
              />
              <Box
                sx={{
                  marginLeft: "1rem",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Rating readOnly size="small" value={averageRating} />
                <Typography sx={{ fontWeight: 400 }} variant="body1">
                  {capitalize(creator?.firstName)}{" "}
                  {capitalize(creator?.lastName)}
                </Typography>
                <Typography
                  mb={1}
                  variant="caption"
                  sx={{ display: "flex", gap: ".25rem", alignItems: "center" }}
                >
                  {creator?.gender === "male" ? (
                    <MaleIcon fontSize="small" color="tertiary" />
                  ) : (
                    <FemaleIcon fontSize="small" sx={{ color: "#DE3163" }} />
                  )}
                  {getAge(creator?.dateOfBirth)} Years Old
                </Typography>
                <Button
                  component={RouterLink}
                  to={`/profile/${post?.userId}`}
                  size="small"
                  sx={{ marginTop: "auto" }}
                  color="tertiary"
                  variant="outlined"
                >
                  View Profile
                </Button>
              </Box>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Grid
        sx={{ marginTop: { xs: ".5rem", md: ".5rem" } }}
        container
        spacing={3}
      >
        <Grid item xs={12} md={8}>
          <Typography color="secondary" variant="h6" sx={{ fontWeight: "600" }}>
            DESCRIPTION
          </Typography>
          <Divider sx={{ margin: ".5rem 0" }} />
          <Paper
            sx={{
              padding: "1rem",
              height: { xs: "auto", md: "304px" },
              // overflowY: "scroll",
              // "&:hover::-webkit-scrollbar": {
              //   display: "block",
              // },
              // "&::-webkit-scrollbar": {
              //   display: "none",
              //   width: "0.512rem",
              // },
              // "&::-webkit-scrollbar-track": {
              //   boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              //   webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              // },
              // "&::-webkit-scrollbar-thumb": {
              //   backgroundColor: "#ccc",
              //   height: "4px",
              //   borderRadius: "4px",
              // },
            }}
          >
            <Typography variant="body1" color="text.primary">
              {post?.desc}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography color="secondary" variant="h6" sx={{ fontWeight: "600" }}>
            LOCATION
          </Typography>
          <Divider sx={{ margin: ".5rem 0" }} />
          <Paper sx={{ padding: "1rem" }}>
            {post && (
              <iframe
                title="Game Location"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "300px",
                  border: "none",
                }}
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_googleMapsKey}
              &q=${postLocation}&center=${post?.latitude},${post?.longitude}`}
              ></iframe>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Overview;
