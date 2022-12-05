import {
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Autocomplete,
  FormControl,
  CircularProgress,
  useMediaQuery,
  Button,
  Avatar,
  Tooltip,
  InputAdornment,
} from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { usePlacesWidget } from "react-google-autocomplete";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import {
  getStorage,
  ref as firebaseRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import theme from "../../theme";
import CustomAlert from "../../components/feedback/CustomAlert";
import { useNavigate } from "react-router-dom";

const CreateGame = () => {
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const [image, setImage] = useState(undefined);
  const [imageProgress, setImageProgess] = useState(0);
  const [postForm, setPostForm] = useState({
    image: null,
    title: "",
    groupId: null,
    desc: "",
    location: null,
    gender: "all",
    date: null,
    startTime: null,
    endTime: null,
    level: 0,
    noOfPeople: 2,
    latitude: null,
    price: 0,
    longitude: null,
  });
  const [alert, setAlert] = useState({
    open: false,
    severity: null,
    message: null,
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ ...alert, open: false });
  };
  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const loading = open && groups.length === 0;
  const { ref } = usePlacesWidget({
    apiKey: process.env.REACT_APP_googleMapsKey,
    options: {
      types: ["establishment"],
      componentRestrictions: { country: "my" },
    },
    onPlaceSelected: (place) => {
      setPostForm((prev) => {
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
    setPostForm({ ...postForm, [e.target.name]: e.target.value });
  };

  const uploadFile = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = firebaseRef(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

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
          setPostForm((prev) => {
            return { ...prev, image: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    image && uploadFile(image);
  }, [image]);

  useEffect(() => {
    const getGroups = async () => {
      try {
        const res = await axios.get("/groups");
        setGroups(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getGroups();
  }, []);

  const handleSubmit = async () => {
    if (postForm?.title.trim() === "") {
      setAlert({
        open: true,
        severity: "error",
        message: "Please enter all fields.",
      });
      return;
    }
    try {
      await axios.post("/posts", postForm, { withCredentials: true });
      setAlert({
        open: true,
        severity: "success",
        message: "Post has been submitted successfully.",
      });
      setTimeout(() => navigate("/login"), 500);
    } catch (error) {
      setAlert({
        open: true,
        severity: "error",
        message: error.response.data.message,
      });
      console.log(error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ minHeight: "calc(100vh - 64px)" }}>
        <Container maxWidth="lg" sx={{ padding: { xs: ".5rem", md: "1rem" } }}>
          <Grid container spacing={3} justifyContent="space-between">
            <Grid item xs={12} md={8}>
              <Paper sx={{ padding: { xs: ".5rem", md: "1rem" } }}>
                <Typography
                  mb=".5rem"
                  variant="h5"
                  sx={{ fontWeight: 500 }}
                  color="text.primary"
                >
                  Create Game
                </Typography>
                <Grid container direction="column" sx={{ gap: "1rem" }}>
                  <TextField
                    onChange={handleChange}
                    name="title"
                    label="Title"
                    size="small"
                    fullWidth
                  />
                  <Autocomplete
                    id="asynchronous-groups"
                    open={open}
                    onChange={(event, value) =>
                      setPostForm({ ...postForm, groupId: value._id })
                    }
                    name="groupId"
                    onOpen={() => {
                      setOpen(true);
                    }}
                    onClose={() => {
                      setOpen(false);
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option._id === value._id
                    }
                    getOptionLabel={(option) => option.title}
                    options={groups}
                    loading={loading}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        fullWidth
                        label="Group"
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <React.Fragment>
                              {loading ? (
                                <CircularProgress color="inherit" size={20} />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        }}
                      />
                    )}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    multiline
                    minRows={4}
                    label="Description or Rules"
                    name="desc"
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    label="location"
                    name="location"
                    inputRef={ref}
                    onChange={(e) =>
                      setPostForm({ ...postForm, location: e.target.value })
                    }
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="gender-label">Gender</InputLabel>
                        <Select
                          name="gender"
                          onChange={handleChange}
                          labelId="gender-label"
                          id="gender"
                          label="Gender"
                          defaultValue="all"
                        >
                          <MenuItem value="all">All</MenuItem>
                          <MenuItem value="male">Male</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Price"
                        name="price"
                        fullWidth
                        placeholder="0.00 (FREE)"
                        size="small"
                        type="number"
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">RM</InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                  {isMatch ? (
                    <MobileDatePicker
                      label="Date"
                      inputFormat="DD/MM/YYYY"
                      value={postForm.date}
                      onChange={(value) => {
                        setPostForm({ ...postForm, date: value });
                      }}
                      renderInput={(params) => (
                        <TextField size="small" name="date" {...params} />
                      )}
                    />
                  ) : (
                    <DesktopDatePicker
                      label="Date"
                      inputFormat="DD/MM/YYYY"
                      disablePast
                      value={postForm.date}
                      onChange={(value) => {
                        setPostForm({ ...postForm, date: value });
                      }}
                      renderInput={(params) => (
                        <TextField size="small" name="date" {...params} />
                      )}
                    />
                  )}

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TimePicker
                        label="Start Time"
                        value={postForm.startTime}
                        onChange={(value) => {
                          setPostForm({
                            ...postForm,
                            startTime: value,
                          });
                        }}
                        renderInput={(params) => (
                          <TextField size="small" fullWidth {...params} />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TimePicker
                        label="End Time"
                        value={postForm.endTime}
                        onChange={(value) => {
                          setPostForm({ ...postForm, endTime: value });
                        }}
                        renderInput={(params) => (
                          <TextField size="small" fullWidth {...params} />
                        )}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="no-of-people-label">
                          No of People
                        </InputLabel>
                        <Select
                          labelId="no-of-people-label"
                          id="no-of-people"
                          label="no-of-people"
                          name="noOfPeople"
                          defaultValue="2"
                          onChange={handleChange}
                        >
                          <MenuItem value="2">2</MenuItem>
                          <MenuItem value="3">3</MenuItem>
                          <MenuItem value="4">4</MenuItem>
                          <MenuItem value="5">5</MenuItem>
                          <MenuItem value="6">6</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="level-label">Level</InputLabel>
                        <Select
                          labelId="level-label"
                          id="level"
                          label="Level"
                          name="level"
                          defaultValue="0"
                          onChange={handleChange}
                        >
                          <MenuItem value="0">Any</MenuItem>
                          <MenuItem value="1">Novice</MenuItem>
                          <MenuItem value="2">Beginner</MenuItem>
                          <MenuItem value="3">Intermediate</MenuItem>
                          <MenuItem value="4">Advanced</MenuItem>
                          <MenuItem value="5">Professional</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  {isMatch && (
                    <>
                      {image ? (
                        <>
                          <Box>
                            {imageProgress !== 100 ? (
                              <>
                                <Box
                                  sx={{
                                    position: "relative",
                                    display: "inline-flex",
                                  }}
                                >
                                  <CircularProgress
                                    size={100}
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
                              </>
                            ) : (
                              <>
                                <label
                                  htmlFor="input-image"
                                  style={{
                                    display: "block",
                                    height: "100px",
                                    width: "100px",
                                    position: "relative",
                                  }}
                                >
                                  <Avatar
                                    variant="rounded"
                                    sx={{
                                      height: 100,
                                      width: 100,
                                      cursor: "pointer",
                                      zIndex: 1,
                                      transition: ".3s all",
                                      "&:hover": { opacity: 0.5 },
                                    }}
                                    src={postForm.image}
                                  />
                                  <Box
                                    sx={{
                                      height: 100,
                                      borderRadius: "5px",
                                      width: 100,
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
                                    name="image"
                                    id="input-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                      setImage(e.target.files[0])
                                    }
                                    style={{ display: "none" }}
                                  />
                                </label>
                              </>
                            )}
                          </Box>
                        </>
                      ) : (
                        <>
                          <label
                            htmlFor="input-image"
                            style={{ width: "100px" }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "1px dashed #ccc",
                                cursor: "pointer",
                                height: "100px",
                                width: "100px",
                                flexDirection: "column",
                                borderRadius: "5px",
                              }}
                            >
                              <AddIcon color="secondary" fontSize="large" />
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                Add Image
                              </Typography>
                            </Box>
                            <input
                              name="image"
                              id="input-image"
                              type="file"
                              accept="image/*"
                              onChange={(e) => setImage(e.target.files[0])}
                              style={{ display: "none" }}
                            />
                          </label>
                        </>
                      )}
                    </>
                  )}

                  <Grid container justifyContent="flex-end">
                    <Button variant="contained" color="inherit">
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      sx={{ marginLeft: ".5rem" }}
                      variant="contained"
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            {!isMatch && (
              <Grid item xs={12} md={4}>
                <Paper>
                  {image ? (
                    <>
                      <Box>
                        {imageProgress !== 100 ? (
                          <>
                            <Box
                              sx={{
                                position: "relative",
                                alignItems: "center",
                                display: "flex",
                                justifyContent: "center",
                                height: 300,
                              }}
                            >
                              <CircularProgress
                                size={150}
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
                          </>
                        ) : (
                          <>
                            <Tooltip
                              arrow
                              followCursor
                              title="Click to upload or change image."
                            >
                              <label
                                htmlFor="input-image"
                                style={{
                                  display: "block",
                                  height: "300px",
                                  width: "100%",
                                  position: "relative",
                                }}
                              >
                                <Avatar
                                  variant="rounded"
                                  sx={{
                                    height: 300,
                                    width: "100%",
                                    cursor: "pointer",
                                    zIndex: 1,
                                    transition: ".3s all",
                                    "&:hover": { opacity: 0.5 },
                                  }}
                                  src={postForm.image}
                                />
                                <Box
                                  sx={{
                                    height: 300,
                                    borderRadius: "5px",
                                    width: "100%",
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
                                  name="image"
                                  id="input-image"
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => setImage(e.target.files[0])}
                                  style={{ display: "none" }}
                                />
                              </label>
                            </Tooltip>
                          </>
                        )}
                      </Box>
                    </>
                  ) : (
                    <>
                      <label
                        htmlFor="input-image"
                        style={{ width: "100%", height: "300px" }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px dashed #ccc",
                            cursor: "pointer",
                            width: "100%",
                            height: "300px",
                            flexDirection: "column",
                            borderRadius: "5px",
                          }}
                        >
                          <AddIcon color="secondary" fontSize="large" />
                          <Typography variant="caption" color="text.secondary">
                            Add Image
                          </Typography>
                        </Box>
                        <input
                          name="image"
                          id="input-image"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setImage(e.target.files[0])}
                          style={{ display: "none" }}
                        />
                      </label>
                    </>
                  )}
                </Paper>
              </Grid>
            )}
          </Grid>
        </Container>
        <CustomAlert
          open={alert.open}
          handleClose={handleClose}
          message={alert.message}
          severity={alert.severity}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default CreateGame;
