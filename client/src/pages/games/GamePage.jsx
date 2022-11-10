import { Box, Tabs, Tab, useMediaQuery, Badge, Tooltip } from "@mui/material";
import { Container } from "@mui/system";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import {
  Link as RouterLink,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import GameHeader from "../../components/game/GameHeader";
import Overview from "./Overview";

import InfoIcon from "@mui/icons-material/Info";
import PeopleIcon from "@mui/icons-material/People";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import axios from "axios";
import { useSelector } from "react-redux";
import theme from "../../theme";
import CustomAlert from "../../components/feedback/CustomAlert";
import Pending from "./Pending";
import Participants from "./Participants";

function LinkTab(props) {
  return (
    <Tab
      sx={{
        textTransform: "none",
      }}
      value={props.value}
      iconPosition="start"
      component={RouterLink}
      {...props}
    />
  );
}

const GamePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [post, setPost] = useState(null);
  const [creator, setCreator] = useState(null);
  const [group, setGroup] = useState(null);
  const [value, setValue] = useState(0);
  const postId = useLocation().pathname.split("/")[2];
  const location = useLocation().pathname.split("/")[3];
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

  const acceptUser = async (senderId) => {
    try {
      await axios.post(
        `/users/accept-request/${post?._id}`,
        { senderId },
        { withCredentials: true }
      );
      setAlert({
        open: true,
        severity: "success",
        message: "Successfully Accepted User.",
      });
      getPost();
    } catch (error) {
      console.log(error);
    }
  };

  const declineUser = async (senderId) => {
    try {
      await axios.post(
        `/users/decline-request/${post?._id}`,
        { senderId },
        { withCredentials: true }
      );
      setAlert({
        open: true,
        severity: "success",
        message: "Successfully declined user.",
      });
      getPost();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRequest = async () => {
    try {
      await axios.post(
        `/users/request/${post?._id}`,
        {},
        { withCredentials: true }
      );
      getPost();
      setAlert({
        open: true,
        severity: "success",
        message: "Request sent.",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelRequest = async () => {
    try {
      await axios.post(
        `/users/unrequest/${post?._id}`,
        {},
        { withCredentials: true }
      );
      getPost();
      setAlert({
        open: true,
        severity: "success",
        message: "Request cancelled successfully.",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post?._id}`, {
        withCredentials: true,
      });
      setAlert({
        open: true,
        severity: "success",
        message: "Game deleted successfully.",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleComplete = async () => {
    try {
      await axios.post(
        `/users/complete-game/${post?._id}`,
        {},
        { withCredentials: true }
      );
      setAlert({
        open: true,
        severity: "success",
        message: "Game completed! Go ahead and rate the participants!",
      });
      getPost();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    switch (location) {
      case "overview":
        setValue(0);
        break;
      case "participants":
        setValue(1);
        break;
      case "chat":
        setValue(2);
        break;
      case "pending":
        setValue(3);
        break;
      default:
        setValue(0);
        break;
    }
  }, [location]);

  const getPost = useCallback(async () => {
    try {
      const postRes = await axios.get(`/posts/${postId}`);
      setPost(postRes.data);

      const userRes = await axios.get(`/users/${post?.userId}`);
      setCreator(userRes.data);

      const groupRes = await axios.get(`/groups/${post?.groupId}`);
      setGroup(groupRes.data);
    } catch (error) {
      console.log(error);
    }
  }, [postId, post?.userId, post?.groupId]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  return (
    <Box sx={{ minHeight: "calc(100vh - 64px)" }}>
      <Container maxWidth="lg" sx={{ padding: { xs: ".5rem", md: "1rem" } }}>
        <GameHeader
          handleRequest={handleRequest}
          handleCancelRequest={handleCancelRequest}
          handleComplete={handleComplete}
          handleDelete={handleDelete}
          group={group}
          post={post}
        />
        <Tabs
          sx={{ borderBottom: "1px solid #d7d7d7" }}
          value={value}
          onChange={handleChange}
          variant={isMatch ? "scrollable" : "standard"}
          indicatorColor="primary"
          textColor="secondary"
          aria-label="Game Tabs"
        >
          <LinkTab
            icon={<InfoIcon fontSize="small" />}
            label="Overview"
            to="overview"
          />
          <LinkTab
            icon={
              post?.isCompleted ? (
                <Badge
                  badgeContent={
                    <Tooltip arrow title="Rate players!">
                      <span>!</span>
                    </Tooltip>
                  }
                  size="small"
                  color="error"
                >
                  <PeopleIcon fontSize="small" />!
                </Badge>
              ) : (
                <PeopleIcon fontSize="small" />
              )
            }
            label="Participants"
            to="participants"
          />
          <LinkTab
            icon={
              <Badge max={5} badgeContent={3} size="small" color="error">
                <ChatBubbleIcon fontSize="small" />
              </Badge>
            }
            label="Chat"
            to="chat"
          />
          {currentUser._id === post?.userId && (
            <LinkTab
              icon={
                <Badge
                  max={5}
                  badgeContent={
                    post?.isMatched.length + 1 === post?.noOfPeople
                      ? 0
                      : post?.pendingUsers.length
                  }
                  size="small"
                  color="error"
                >
                  <PeopleIcon fontSize="small" />
                </Badge>
              }
              label="Pending"
              to="pending"
            />
          )}
        </Tabs>
        <Routes>
          <Route
            path="overview"
            element={<Overview post={post} creator={creator} />}
          />
          <Route
            path="participants"
            element={<Participants getPost={getPost} post={post} />}
          />
          <Route path="chat" element={<>Chat</>} />
          <Route
            path="pending"
            element={
              <Pending
                acceptUser={acceptUser}
                declineUser={declineUser}
                post={post}
              />
            }
          />
        </Routes>
      </Container>
      <CustomAlert
        open={alert.open}
        handleClose={handleClose}
        message={alert.message}
        severity={alert.severity}
      />
    </Box>
  );
};

export default GamePage;
