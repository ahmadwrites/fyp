import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Message from "../../components/game/Message";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

const Chat = ({ post }) => {
  const location = useLocation().pathname.split("/")[2];
  const { currentUser } = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState("");
  const scrollRef = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.emit("join", location);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [location]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    // emit: send event to server
    // on: take event from server
    socket.current.emit("addUser", currentUser._id);
  }, [currentUser]);

  // Get Messages
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`/messages/${post?._id}`);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMessages();
  }, [post?._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newMessage.trim() === "") return;

    socket.current.emit("sendMessage", {
      senderId: currentUser._id,
      text: newMessage,
    });

    try {
      const res = await axios.post(
        `/messages/${post?._id}`,
        { text: newMessage },
        {
          withCredentials: true,
        }
      );
      setMessages([...messages, res.data]);

      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (
    post?.userId !== currentUser._id &&
    !post?.isMatched?.includes(currentUser._id)
  ) {
    return <Navigate to={`/games/${post?._id}/overview`} />;
  }

  return (
    <Paper sx={{ marginTop: "1rem" }}>
      <Box
        sx={{
          height: { xs: "calc(100vh - 216px)", md: "calc(100vh - 256px)" },
          padding: { xs: ".5rem", md: "1rem" },
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            display: "block",
            width: "0.512rem",
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ccc",
            height: "4px",
            borderRadius: "4px",
          },
        }}
      >
        <Divider>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", marginBottom: ".5rem" }}
          >
            Chat started on {moment(post?.createdAt).format("Do MMMM YYYY")}
          </Typography>
        </Divider>
        {messages.map((message, i) => (
          <div key={message?._id} ref={scrollRef}>
            <Message
              own={message?.senderId === currentUser._id}
              message={message}
            />
          </div>
        ))}
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid
          sx={{ padding: ".5rem" }}
          container
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={9} md={11}>
            <TextField
              onChange={(e) => setNewMessage(e.target.value)}
              fullWidth
              value={newMessage}
              size="small"
            />
          </Grid>
          <Grid item xs={3} md={1}>
            <Button onClick={handleSubmit} fullWidth variant="contained">
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Chat;
