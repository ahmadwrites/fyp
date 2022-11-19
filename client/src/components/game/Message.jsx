import {
  Avatar,
  Grid,
  Typography,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { format } from "timeago.js";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import theme from "../../theme";
import { useEffect } from "react";
import axios from "axios";

const Message = ({ message, own }) => {
  const [messageOwner, setMessageOwner] = useState();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/users/${message?.senderId}`);
        setMessageOwner(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [message?.senderId]);

  return (
    <Grid
      container
      justifyContent={own ? "flex-end" : "flex-start"}
      sx={{ marginBottom: "1rem" }}
    >
      <Grid
        container
        justifyContent={own ? "flex-end" : "flex-start"}
        alignItems="center"
        sx={{ gap: ".75rem" }}
      >
        {!own && (
          <Tooltip title={messageOwner?.username}>
            <Avatar
              src={messageOwner?.avatar}
              component={RouterLink}
              to={`/profile/${messageOwner?._id}`}
            />
          </Tooltip>
        )}
        <Typography
          variant={isMatch ? "body2" : "body1"}
          sx={{
            backgroundColor: "#0092ed",
            color: "#fff",
            padding: ".5rem",
            maxWidth: "80%",
            borderRadius: "4px",
          }}
        >
          {message?.text}
        </Typography>
        {own && (
          <Tooltip title={messageOwner?.username}>
            <Avatar
              src={messageOwner?.avatar}
              component={RouterLink}
              to={`/profile/${messageOwner?._id}`}
            />
          </Tooltip>
        )}
      </Grid>
      <Typography mt={1} variant="body2" color="text.secondary">
        {format(message?.createdAt)}
      </Typography>
    </Grid>
  );
};

export default Message;
