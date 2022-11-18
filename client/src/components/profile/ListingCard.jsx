import {
  Avatar,
  Paper,
  Typography,
  Divider,
  LinearProgress,
  Grid,
  Tooltip,
  Chip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import moment from "moment";

import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import MapIcon from "@mui/icons-material/Map";
import axios from "axios";

const ListingCard = ({ post }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [group, setGroup] = useState("");
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const getGroup = async () => {
      try {
        const res = await axios.get(`/groups/${post?.groupId}`);
        setGroup(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getGroup();
  }, [post?.groupId]);

  useEffect(() => {
    const getDistance = async () => {
      try {
        if (!currentUser) {
          setDistance(0);
        } else {
          const res = await axios.post(
            `/posts/distance`,
            {
              lat1: post?.latitude,
              long1: post?.longitude,
              lat2: currentUser?.latitude,
              long2: currentUser?.longitude,
            },
            { withCredentials: true }
          );
          setDistance(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getDistance();
  }, [
    currentUser,
    currentUser?.latitude,
    currentUser?.longitude,
    post?.latitude,
    post?.longitude,
  ]);

  return (
    <Paper
      sx={{
        transition: ".3s ease all",
        "&:hover": {
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          background:
            "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%)",
        }}
      >
        <Avatar
          component={RouterLink}
          to={`/games/${post?._id}/overview`}
          variant="square"
          src={post?.image}
          sx={{
            opacity: post?.isCompleted ? 0.4 : 1,
            height: "175px",
            cursor: "pointer",
            width: "100%",
          }}
        />
        {post?.isCompleted && (
          <Chip
            label="Completed"
            color="success"
            sx={{ position: "absolute", top: 8, right: 8 }}
          />
        )}
      </Box>
      <Box sx={{ padding: "1rem" }}>
        <Grid
          sx={{ padding: ".5rem 0 1rem" }}
          container
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: 500 }}
            color="text.primary"
          >
            {post?.title}
          </Typography>
          <Tooltip
            title={<Typography variant="body2">{post?.location}</Typography>}
            arrow
          >
            <Typography variant="body2" color="text.primary">
              {currentUser?.location ? (
                `${Math.round(distance)}km`
              ) : (
                <>
                  {currentUser ? (
                    <Typography
                      color="text.primary"
                      component={RouterLink}
                      to={`/settings/profile`}
                    >
                      <MapIcon sx={{ color: "inherit" }} fontSize="small" />
                    </Typography>
                  ) : (
                    <Typography
                      color="text.primary"
                      component={RouterLink}
                      to={`/login`}
                    >
                      <MapIcon sx={{ color: "inherit" }} fontSize="small" />
                    </Typography>
                  )}
                </>
              )}
            </Typography>
          </Tooltip>
        </Grid>
        <Divider sx={{ margin: "0 0 1rem" }} />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SportsEsportsIcon fontSize="small" />
          <Typography
            ml={1}
            mr={0.5}
            variant="body2"
            sx={{ fontWeight: "500" }}
          >
            Group:
          </Typography>
          <Typography variant="body2">{group?.title}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CalendarMonthIcon fontSize="small" />
          <Typography
            ml={1}
            mr={0.5}
            variant="body2"
            sx={{ fontWeight: "500" }}
          >
            Starts:
          </Typography>
          <Typography variant="body2">
            {moment(post?.date).format("DD/MM/yyyy")},{" "}
            {moment(post?.startTime).format("HH:mm")}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CalendarMonthIcon fontSize="small" />
          <Typography
            ml={1}
            mr={0.5}
            variant="body2"
            sx={{ fontWeight: "500" }}
          >
            Ends:
          </Typography>
          <Typography variant="body2">
            {moment(post?.date).format("DD/MM/yyyy")},{" "}
            {moment(post?.endTime).format("HH:mm")}
          </Typography>
        </Box>
        <Tooltip
          arrow
          title={`${post?.isMatched.length + 1} / ${post?.noOfPeople} Players`}
        >
          <LinearProgress
            sx={{ margin: "1rem 0", height: 8, borderRadius: "4px" }}
            variant="determinate"
            color={post?.isCompleted ? "success" : "primary"}
            value={
              post?.isCompleted
                ? 100
                : ((post?.isMatched.length + 1) / post?.noOfPeople) * 100
            }
          />
        </Tooltip>
        <Grid container justifyContent="space-between">
          <Box sx={{ display: "flex", alignItems: "center", gap: ".25rem" }}>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {post?.noOfPeople}{" "}
            </Typography>
            <Typography variant="body2">Total Slots</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: ".25rem",
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {post?.noOfPeople - (post?.isMatched.length + 1)}
            </Typography>
            <Typography variant="body2">
              Available Slot
              {post?.noOfPeople - (post?.isMatched.length + 1) !== 1 ? "s" : ""}
            </Typography>
          </Box>
        </Grid>
      </Box>
    </Paper>
  );
};

export default ListingCard;
