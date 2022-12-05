import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, CircularProgress } from "@mui/material";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { useCookies } from "react-cookie";
import CustomAlert from "../../components/feedback/CustomAlert";
import axios from "axios";
import { Box } from "@mui/system";
import ExploreDialog from "../../components/dialogs/ExploreDialog";
import ExploreHelpDialog from "../../components/dialogs/ExploreHelpDialog";

const Explore = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [openInfo, setOpenInfo] = useState({
    open: false,
    post: null,
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_googleMapsKey,
  });
  const [alert, setAlert] = useState({
    open: false,
    severity: null,
    message: null,
  });

  // Cookie Dialog
  const [cookies, setCookie] = useCookies(["isShown"]);
  const [checkbox, setCheckbox] = useState(false);

  useEffect(() => {
    if (cookies.isShown === undefined) {
      setCookie("isShown", true, {
        path: "/",
      });
    }
  }, [cookies, setCookie]);

  const [openHelpDialog, setOpenHelpDialog] = useState(true);

  const handleCloseHelpDialog = () => {
    setOpenHelpDialog(false);
    if (checkbox === true) {
      setCookie("isShown", false, {
        path: "/",
      });
    } else {
      setCookie("isShown", true, {
        path: "/",
      });
    }
  };

  const handleCheck = () => {
    setCheckbox((prev) => !prev);
  };

  // Others
  const handleOpenInfo = (post) => {
    setOpenInfo({ open: true, post: post });
  };

  const handleCloseInfo = () => {
    setOpenInfo({ open: false, post: null });
  };

  const center = useMemo(
    () => ({
      lat: parseFloat(currentUser.latitude),
      lng: parseFloat(currentUser.longitude),
    }),
    [currentUser]
  );

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ ...alert, open: false });
  };

  useEffect(() => {
    if (
      currentUser.location === "" ||
      !currentUser.location ||
      !currentUser.latitude ||
      !currentUser.longitude
    ) {
      setAlert({
        open: true,
        severity: "warning",
        message: "Add your location in profile settings first. Redircting...",
      });
      const timeoutID = setTimeout(
        () => (window.location.href = "/settings/profile"),
        2000
      );
      return () => {
        clearTimeout(timeoutID);
      };
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get("/posts");
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPosts();
  }, []);

  if (!isLoaded)
    return (
      <Grid
        container
        sx={{ width: "100%", height: "calc(100vh - 64px)" }}
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Grid>
    );

  return (
    <Box sx={{ width: "100%", height: "calc(100vh - 64px)" }}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "calc(100vh - 64px)" }}
        zoom={13}
        center={center}
      >
        {posts.map((post) => (
          <MarkerF
            key={post?._id}
            onClick={() => handleOpenInfo(post)}
            position={{
              lat: parseFloat(post?.latitude),
              lng: parseFloat(post?.longitude),
            }}
          ></MarkerF>
        ))}
      </GoogleMap>

      {cookies.isShown === "true" && (
        <ExploreHelpDialog
          checkbox={checkbox}
          handleCheck={handleCheck}
          open={openHelpDialog}
          handleClose={handleCloseHelpDialog}
        />
      )}
      <ExploreDialog
        open={openInfo.open}
        post={openInfo.post}
        handleClose={handleCloseInfo}
      />
      <CustomAlert
        open={alert.open}
        handleClose={handleClose}
        message={alert.message}
        severity={alert.severity}
      />
    </Box>
  );
};

export default Explore;
