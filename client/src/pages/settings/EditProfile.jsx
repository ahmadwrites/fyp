import {
  Avatar,
  Grid,
  Paper,
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  getStorage,
  ref as firebaseRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import CustomAlert from "../../components/feedback/CustomAlert";
import axios from "axios";
import { editProfile } from "../../redux/userSlice";
import { usePlacesWidget } from "react-google-autocomplete";

const EditProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [alert, setAlert] = useState({
    open: false,
    severity: null,
    message: null,
  });
  const [image, setImage] = useState(undefined);
  const [imageProgress, setImageProgess] = useState(0);
  const [userForm, setUserForm] = useState({
    avatar: currentUser.avatar,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    desc: currentUser.desc,
    location: currentUser.location,
    latitude: currentUser.latitude,
    longitude: currentUser.longitude,
  });

  const { ref } = usePlacesWidget({
    apiKey: process.env.REACT_APP_googleMapsKey,
    options: {
      types: ["(regions)"],
      componentRestrictions: { country: "my" },
    },
    onPlaceSelected: (place) => {
      console.log(place);
      setUserForm((prev) => {
        return {
          ...prev,
          location: place?.formatted_address,
          latitude: place?.geometry.location.lat(),
          longitude: place?.geometry.location.lng(),
        };
      });
    },
  });

  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ ...alert, open: false });
  };

  const uploadFile = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = firebaseRef(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Todo: Find current image in firebase and delete it.

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageProgess(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUserForm((prev) => {
            return { ...prev, avatar: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    image && uploadFile(image);
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      userForm.firstName.trim() === "" ||
      userForm.lastName.trim() === "" ||
      userForm.email.trim() === ""
    ) {
      setAlert({
        open: true,
        severity: "error",
        message: "Please fill in all fields!",
      });
      return;
    }

    try {
      const res = await axios.put(`/users/${currentUser._id}`, userForm, {
        withCredentials: true,
      });
      dispatch(editProfile(res.data));
      setAlert({
        open: true,
        severity: "success",
        message: "Successfully updated profile.",
      });
    } catch (error) {
      setAlert({
        open: true,
        severity: "error",
        message: error.response.data.message,
      });
    }
  };

  return (
    <Paper
      elevation={1}
      sx={{
        background: "#fff",
        padding: { xs: "1rem .5rem", md: "1rem 1rem" },
      }}
    >
      <Grid container sx={{ gap: "1rem" }}>
        <Grid container mb="1rem" justifyContent="center">
          {image && imageProgress !== 100 ? (
            <Box sx={{ position: "relative", display: "inline-flex" }}>
              <CircularProgress
                size={128}
                color="tertiary"
                variant="determinate"
                value={imageProgress}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="body1"
                  component="div"
                  color="text.secondary"
                >
                  {`${imageProgress}%`}
                </Typography>
              </Box>
            </Box>
          ) : (
            <>
              <Tooltip
                arrow
                followCursor
                title="Click to upload or change image."
              >
                <label htmlFor="input-avatar" style={{ position: "relative" }}>
                  <Avatar
                    src={userForm.avatar}
                    sx={{
                      height: 128,
                      width: 128,
                      cursor: "pointer",
                      zIndex: 1,
                      transition: ".3s all",
                      "&:hover": { opacity: 0.5 },
                    }}
                  />
                  <Box
                    sx={{
                      height: 128,
                      borderRadius: "50%",
                      width: 128,
                      position: "absolute",
                      top: 0,
                      left: 0,
                      backgroundColor: "#000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex",
                    }}
                  ></Box>
                  <input
                    name="avatar"
                    id="input-avatar"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </label>
              </Tooltip>
            </>
          )}
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              defaultValue={currentUser.firstName}
              label="First Name"
              fullWidth
              size="small"
              name="firstName"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              defaultValue={currentUser.lastName}
              label="Last Name"
              fullWidth
              size="small"
              name="lastName"
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <TextField
          defaultValue={currentUser.email}
          fullWidth
          name="email"
          size="small"
          label="Email Address"
          onChange={handleChange}
        />

        <TextField
          defaultValue={currentUser.location}
          fullWidth
          inputRef={ref}
          name="location"
          size="small"
          label="Current Location"
          onChange={(e) =>
            setUserForm({ ...userForm, location: e.target.value })
          }
        />

        <TextField
          defaultValue={currentUser.desc}
          multiline
          minRows={5}
          label="Description"
          fullWidth
          name="desc"
          onChange={handleChange}
        />

        <Grid container justifyContent="flex-end">
          <Button
            component={RouterLink}
            to={`/profile/${currentUser._id}`}
            color="inherit"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            sx={{ marginLeft: ".5rem" }}
            variant="contained"
          >
            Save
          </Button>
        </Grid>
      </Grid>
      <CustomAlert
        open={alert.open}
        handleClose={handleClose}
        message={alert.message}
        severity={alert.severity}
      />
    </Paper>
  );
};

export default EditProfile;
