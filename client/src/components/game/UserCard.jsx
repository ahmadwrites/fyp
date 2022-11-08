import {
  Avatar,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";

import getAge from "../../utils/getAge";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

const UserCard = ({ userId, acceptUser, declineUser, type, creator }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/users/${userId}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [userId]);

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
          <Rating value={3.6} readOnly size="small" />
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
                <Button size="small" variant="text" color="tertiary">
                  View Profile
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default UserCard;
