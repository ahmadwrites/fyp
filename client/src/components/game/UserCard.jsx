import {
  Avatar,
  Button,
  Divider,
  Grid,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";

import getAge from "../../utils/getAge";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { useSelector } from "react-redux";
import RatingDialog from "../dialogs/RatingDialog";
import serverUrl from "../../utils/serverUrl";

const UserCard = ({
  userId,
  acceptUser,
  declineUser,
  type,
  post,
  creator,
  getPost,
}) => {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState(null);
  const [openRatingModal, setOpenRatingModal] = useState(false);
  const [rating, setRating] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const handleOpenRatingModal = () => {
    setOpenRatingModal(true);
  };

  const handleCloseRatingModal = () => {
    setOpenRatingModal(false);
  };

  const getRating = useCallback(async () => {
    try {
      const ratingRes = await axios.get(
        `${serverUrl}/ratings/post/${post?._id}?raterId=${currentUser._id}&rateeId=${userId}`
      );
      setRating(ratingRes.data);
      const averageRes = await axios.get(
        `${serverUrl}/ratings/user-received-average/${userId}`
      );
      setAverageRating(averageRes.data);
    } catch (error) {
      console.log(error);
    }
  }, [post?._id, currentUser._id, userId]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${serverUrl}/users/${userId}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getRating();
    getUser();
  }, [userId, getRating]);

  return (
    <>
      <Paper
        elevation={1}
        sx={{
          padding: { xs: ".5rem", md: "1rem" },
        }}
      >
        <Grid container direction="column" alignItems="center">
          <Avatar
            component={RouterLink}
            to={`/profile/${user?._id}`}
            src={user?.avatar}
            sx={{ height: "6rem", width: "6rem" }}
          />
          <Typography
            mt={1}
            component={RouterLink}
            to={`/profile/${user?._id}`}
            variant="body1"
            color="text.primary"
            sx={{
              fontWeight: "500",
              textTransform: "capitalize",
              textDecoration: "none",
            }}
          >
            {user?.username}
          </Typography>
          <Typography
            mb={1}
            variant="body2"
            sx={{ display: "flex", gap: ".25rem", alignItems: "center" }}
          >
            {user?.gender === "male" ? (
              <MaleIcon fontSize="small" color="tertiary" />
            ) : (
              <FemaleIcon fontSize="small" sx={{ color: "#DE3163" }} />
            )}
            {getAge(user?.dateOfBirth)} Years Old
          </Typography>
          <Rating value={averageRating} precision={0.5} readOnly size="small" />
          <Divider sx={{ margin: ".5rem 0" }} flexItem />
          <Grid container justifyContent="space-evenly">
            {type === "pending" ? (
              <>
                <Button
                  onClick={() => declineUser(user?._id)}
                  size="small"
                  variant="outlined"
                  color="error"
                >
                  Reject
                </Button>
                <Button
                  onClick={() => acceptUser(user?._id)}
                  size="small"
                  variant="outlined"
                  color="tertiary"
                >
                  Accept
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={RouterLink}
                  to={`/profile/${user?._id}`}
                  size="small"
                  variant="contained"
                  color="inherit"
                >
                  Profile
                </Button>
                {rating.length < 1 &&
                  post?.isCompleted &&
                  (post?.userId === currentUser._id ||
                    post?.isMatched.includes(currentUser._id)) &&
                  user?._id !== currentUser._id && (
                    <Button
                      onClick={handleOpenRatingModal}
                      size="small"
                      variant="contained"
                      color="tertiary"
                    >
                      Rate
                    </Button>
                  )}
              </>
            )}
          </Grid>
        </Grid>
        <RatingDialog
          getPost={getPost}
          open={openRatingModal}
          handleClose={handleCloseRatingModal}
          post={post}
          userId={userId}
          user={user}
          getRating={getRating}
        />
      </Paper>
    </>
  );
};

export default UserCard;
