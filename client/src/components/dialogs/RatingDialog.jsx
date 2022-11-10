import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CustomAlert from "../feedback/CustomAlert";

const capitalize = (s) =>
  s?.charAt(0).toUpperCase() + s?.slice(1).toLowerCase();

const RatingDialog = ({ post, handleClose, open, user, userId, getRating }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [alert, setAlert] = useState({
    open: false,
    severity: null,
    message: null,
  });

  const [ratingForm, setRatingForm] = useState({
    postId: post?._id,
    raterId: currentUser._id,
    rateeId: userId,
    title: "",
    desc: "",
    overallRating: 0,
    level: 1,
  });

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ ...alert, open: false });
  };

  const handleChange = (e) => {
    setRatingForm({ ...ratingForm, [e.target.name]: e.target.value });
  };

  const addRating = async () => {
    try {
      await axios.post(`/ratings`, ratingForm, { withCredentials: true });
      setAlert({
        open: true,
        severity: "success",
        message: "Rating Sent.",
      });
      handleClose(true);
      getRating();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Rating {user?.username}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ display: { xs: "none", md: "block" } }}>
            Rate {capitalize(user?.firstName)} {capitalize(user?.lastName)}{" "}
            based on his timing, perfomance, sportsmanship and overall attitude!
            Remember to give them a fair and honest rating!
          </DialogContentText>
          <TextField
            margin="dense"
            name="title"
            label="Title"
            fullWidth
            size="small"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Description"
            name="desc"
            multiline
            minRows={3}
            fullWidth
            size="small"
            variant="outlined"
            onChange={handleChange}
          />
          <FormControl margin="dense" fullWidth size="small">
            <InputLabel id="level-label">Level</InputLabel>
            <Select
              labelId="level-label"
              id="level"
              label="Level"
              name="level"
              defaultValue={1}
              onChange={handleChange}
            >
              <MenuItem value={1}>Novice</MenuItem>
              <MenuItem value={2}>Beginner</MenuItem>
              <MenuItem value={3}>Intermediate</MenuItem>
              <MenuItem value={4}>Advanced</MenuItem>
              <MenuItem value={5}>Professional</MenuItem>
            </Select>
          </FormControl>
          <Typography component="legend">Rating</Typography>
          <Rating
            name="rating"
            size="large"
            onChange={(event, newValue) => {
              setRatingForm({ ...ratingForm, overallRating: newValue });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="inherit" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={addRating} variant="contained" color="primary">
            Rate
          </Button>
        </DialogActions>
      </Dialog>
      <CustomAlert
        open={alert.open}
        handleClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />
    </>
  );
};

export default RatingDialog;
